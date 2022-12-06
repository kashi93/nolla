import yargs from "yargs";
import fs from "fs";
import chalk from "chalk";

export default yargs.command({
  command: "create:controller",
  describe: "Create a new controller class",
  builder: {
    name: {
      alias: "n",
      describe: "Name of controller",
      demandOption: true,
      type: "string",
    },
    // resource: {
    //   alias: "r",
    //   demandOption: false,
    //   describe: "Generate controller with resources app method",
    //   type: "boolean",
    //   default: false,
    // },
  },
  async handler(argv) {
    const path = require("path");
    let p = `${path.dirname(require.main?.filename)}/app/controllers/`;
    const arr1 = String(argv.name).split("/");
    const con = arr1[arr1.length - 1];
    let m = null;
    let condir = "./";
    let typesdir = "../..";
    arr1.pop();

    if (
      !Number.isNaN(parseInt(String(con))) ||
      !Number.isNaN(parseInt(String(con)))
    ) {
      console.log(chalk.red("Invalid name!"));
      return;
    }

    if (con == "controller") {
      console.log(chalk.red("Invalid name!"));
      return;
    }

    if (con.trim().length > 0) {
      for await (const dir of arr1) {
        typesdir += "/..";
        condir += "../";
        p += dir.toLocaleLowerCase() + "/";
        fs.promises.mkdir(p);
      }

      m = await fs.promises
        .readFile(
          `${path.dirname(
            require.main?.filename
          )}/vendor/template/controller.template.txt`,
          "utf-8"
        )
        .then((t) =>
          t
            .replace(
              /ControllerTemplate/g,
              `${con
                .replace(/\s(.)/g, function ($1) {
                  return $1.toUpperCase();
                })
                .replace(/\s/g, "")
                .replace(/^(.)/, function ($1) {
                  return $1.toLowerCase();
                })}`
            )
            .replace(/con_dir/g, `${condir}controller`)
            .replace(/types_dir/g, typesdir)
        );
    }

    if (m != null) {
      try {
        await fs.promises.open(
          `${p}${String(con)
            .replace(/\s(.)/g, function ($1) {
              return $1.toUpperCase();
            })
            .replace(/\s/g, "")
            .replace(/^(.)/, function ($1) {
              return $1.toLowerCase();
            })}.ts`,
          "r"
        );
        console.log(chalk.red(`Controller ${con} already exist!`));
      } catch (error) {
        await fs.promises.writeFile(
          `${p}${String(con)
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
            `Created Controller: ${String(con)
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
    }
  },
});
