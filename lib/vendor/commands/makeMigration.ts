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
  },
  async handler(argv) {
    const path = require("path");
    let p = `${path.dirname(require.main?.filename)}/migrations/`;
    let m = null;
    let fileName = "";

    const migrations = await fs.promises.readdir(p);
    for await (const migrate of migrations) {
      const { Migration } = require(`${p}/${migrate}`);
      if (Migration.up != null) {
        const m2 = Migration.up();
        if (m2.name == argv.name) {
          console.log(chalk.red(`Migration ${argv.name} already exist!`));
          return;
        }
      }
    }

    if (!Number.isNaN(parseInt(String(argv.name)))) {
      console.log(chalk.red("Migrations name invalid!"));
      return;
    }

    if (argv.name != "") {
      m = await fs.promises
        .readFile(
          `${path.dirname(
            require.main?.filename
          )}/vendor/template/migrations.js`,
          "utf-8"
        )
        .then((t) => t.replace(/{table_name}/g, `${argv.name}`));
      fileName = `${argv.name}_${new Date().getTime()}`;
    }

    if (m != null) {
      await fs.promises.writeFile(`${p}${fileName}.js`, m, "utf-8");
      console.log(chalk.green(`Created Migration: ${p}${fileName}`));
    }
  },
});
