import yargs from "yargs";
import fs from "fs";
import Table, { params } from "../database/mysql/table";
import { checkMysqlTableExist } from "../rainbows/checkMysqlTableExist";
import migrationModel from "../database/mysql/model/migration.model";
import chalk from "chalk";

export default yargs.command({
  command: "migrate",
  describe: "Run the database migrations",
  builder: {
    rollback: {
      alias: "r",
      required: false,
      type: "boolean",
      default: false,
    },
  },
  async handler(argv) {
    if ((await config("database.default")) == "mysql") {
      const path = require("path");

      if (!(await checkMysqlTableExist("migrations"))) {
        const { default: mysql } = require(`../database/mysql/connection`);
        const { Migration } = require(`${path.dirname(
          require.main?.filename
        )}/migrations/migrations_1664719972281`);
        const m2 = Migration.up();
        await new mysql().query(
          `CREATE TABLE ${m2.name} (${params.join(",")})`
        );
        await migrationModel.create({
          migration: "migrations_1664719972281.js",
        });
        Table.resetParams();
      }

      const p = `${path.dirname(require.main?.filename)}/migrations/`;
      const migrations = await fs.promises.readdir(p);
      for await (const migrate of migrations) {
        const { default: mysql } = require(`../database/mysql/connection`);
        const { Migration } = require(`${p}/${migrate}`);
        if (!argv.rollback) {
          const m2 = Migration.up();
          if (m2.name != "migrations") {
            if (
              (await migrationModel.where("migration", "=", migrate).first()) ==
              null
            ) {
              await new mysql().query(
                `CREATE TABLE ${m2.name} (${params.join(",")})`
              );
              await migrationModel.create({
                migration: migrate,
              });
            }
          }
        } else {
          const m2 = Migration.down();
          await new mysql().query(`DROP TABLE ${m2.name}`);
        }
        Table.resetParams();
      }
      console.log(chalk.green(`Migrations successfully`));
    }
  },
});
