import yargs from "yargs";
import fs from "fs";
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
    const path = require("path");

    if ((await config("database.default")) == "mysql") {
      if (!(await checkMysqlTableExist("migrations"))) {
        const { default: Migration } = await import(
          "../database/mysql/migrations/000000_migrations"
        );
        await Migration.up();
        await migrationModel.create({
          migration: "000000_migrations",
        });
      }
    }

    const p = `${path.dirname(require.main?.filename)}/migrations/`;
    const migrations = await fs.promises.readdir(p);

    for await (const migrate of migrations) {
      const { default: Migration } = await import(`${p}/${migrate}`);
      const name = migrate.split(".");
      name.pop();
      await Migration.up();
      if (!argv.rollback) {
        if (
          (await migrationModel
            .where("migration", "=", name.join(""))
            .first()) == null
        ) {
          await migrationModel.create({
            migration: name.join(""),
          });
        }
      } else {
        const { default: m1 } = await import(
          "../database/mysql/migrations/000000_migrations"
        );
        await m1.down();
        await Migration.down();
      }
    }
    console.log(chalk.green(`Migrations successfully`));
  },
});
