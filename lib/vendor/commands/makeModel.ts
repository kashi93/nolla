import yargs from "yargs";
import fs from "fs";
import chalk from "chalk";

export default yargs.command({
  command: "create:model",
  describe: "Create a new model class",
  builder: {
    class: {
      alias: "c",
      required: true,
      type: "string",
      describe: "name of model",
    },
    table_name: {
      alias: "tn",
      required: true,
      type: "string",
      describe: "name of database table",
    },
  },
  async handler(argv) {
    const path = require("path");
    const p = `${path.dirname(require.main?.filename)}/app/models/`;
    let m = null;

    if (
      !Number.isNaN(parseInt(String(argv.class))) ||
      !Number.isNaN(parseInt(String(argv.table_name)))
    ) {
      console.log(chalk.red("Invalid name!"));
      return;
    }

    if (argv.class == "model" || argv.table_name == "model") {
      console.log(chalk.red("Invalid name!"));
      return;
    }

    const models = await fs.promises.readdir(p);

    for await (const model of models) {
      if (`${String(argv.class).toLowerCase()}.ts` == model) {
        console.log(chalk.red(`Model ${argv.class} already exist!`));
        return;
      }
    }

    if (argv.class != "" && argv.table_name != "") {
      m = await fs.promises
        .readFile(
          `${path.dirname(
            require.main?.filename
          )}/vendor/template/model.template.txt`,
          "utf-8"
        )
        .then((t) =>
          t.replace(/{table_name}/g, `${argv.table_name}`).replace(
            /ModelTemplate/g,
            `${String(argv.class)
              .replace(/\s(.)/g, function ($1) {
                return $1.toUpperCase();
              })
              .replace(/\s/g, "")
              .replace(/^(.)/, function ($1) {
                return $1.toLowerCase();
              })}`
          )
        );
    }

    if (m != null) {
      await fs.promises.writeFile(
        `${p}${String(argv.class)
          .replace(/\s(.)/g, function ($1) {
            return $1.toUpperCase();
          })
          .replace(/\s/g, "")
          .replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
          })}.ts`,
        m,
        "utf-8"
      );

      console.log(
        chalk.green(
          `Created Model: ${String(argv.class)
            .replace(/\s(.)/g, function ($1) {
              return $1.toUpperCase();
            })
            .replace(/\s/g, "")
            .replace(/^(.)/, function ($1) {
              return $1.toLowerCase();
            })}.ts`
        )
      );
    }
  },
});
