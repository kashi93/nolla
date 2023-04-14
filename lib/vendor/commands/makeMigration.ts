import yargs from "yargs";
import fs from "fs";
import chalk from "chalk";

export default yargs.command({
  command: "create:migration",
  describe: "Create a new migration files",
  builder: {
    name: {
      alias: "n",
      required: true,
      type: "string",
      describe: "The name of the migration",
    },
    create: {
      alias: "c",
      required: false,
      type: "string",
      describe: "The table to be created",
    },
    table: {
      alias: "t",
      required: false,
      type: "string",
      describe: "The table to migrate",
    },
  },
  async handler(argv) {
    const path = require("path");
    const p = `${path.dirname(require.main?.filename)}/migrations/`;
    let m = null;
    let fileName = "";

    if (String(argv.name || argv.create || argv.table).trim().length > 0) {
      m = await fs.promises
        .readFile(
          `${path.dirname(
            require.main?.filename
          )}/vendor/template/migrations.txt`,
          "utf-8"
        )
        .then((t) =>
          t
            .replace(
              /{table_name}/g,
              `${argv.table || argv.create || argv.name}`
            )
            .replace(
              /{operation}/g,
              String(argv.table || "").trim().length < 1 ? "create" : "table"
            )
            .replace(
              /{down_scalfold}/g,
              String(argv.table || "").trim().length < 1
                ? `await Schema.dropIfExists("${
                    argv.table || argv.create || argv.name
                  }")`
                : "//"
            )
            .replace(
              /{table_scalfold}/g,
              String(argv.table || "").trim().length < 1 ? "table.id();" : "//"
            )
        );
      fileName = `${new Date().getTime()}_${argv.name}`;
    }

    if (m != null) {
      await fs.promises.writeFile(`${p}${fileName}.ts`, m, "utf-8");
      console.log(chalk.green(`Created Migration: ${p}${fileName}`));
    }
  },
});
