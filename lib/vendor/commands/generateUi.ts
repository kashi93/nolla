import yargs from "yargs";
import fs from "fs";
import chalk from "chalk";

export default yargs.command({
  command: "generate:ui",
  describe:
    "Generate front-end scaffolding for the application preset type (bootstrap, vue, react)",
  builder: {
    type: {
      alias: "t",
      required: true,
      type: "string",
    },
  },
  async handler(argv) {
    const path = require("path");
    switch (argv.type) {
      case "react":
        if (
          !fs.existsSync(
            `${path.dirname(require.main?.filename)}/resources/js/react`
          )
        ) {
          await fs.promises.mkdir(
            `${path.dirname(require.main?.filename)}/resources/js/react`
          );
        }

        const jsFiles = await fs.promises.readdir(
          `${path.dirname(require.main?.filename)}/vendor/template/ui/react/js`
        );

        for await (const js of jsFiles) {
          await fs.promises.copyFile(
            `${path.dirname(
              require.main?.filename
            )}/vendor/template/ui/react/js/${js}`,
            `${path.dirname(require.main?.filename)}/resources/js/react/${js}`
          );
        }

        if (
          !fs.existsSync(
            `${path.dirname(require.main?.filename)}/resources/css/react`
          )
        ) {
          await fs.promises.mkdir(
            `${path.dirname(require.main?.filename)}/resources/css/react`
          );
        }

        const csFiles = await fs.promises.readdir(
          `${path.dirname(require.main?.filename)}/vendor/template/ui/react/css`
        );

        for await (const css of csFiles) {
          await fs.promises.copyFile(
            `${path.dirname(
              require.main?.filename
            )}/vendor/template/ui/react/css/${css}`,
            `${path.dirname(require.main?.filename)}/resources/css/react/${css}`
          );
        }

        break;

      default:
        break;
    }
  },
});
