import yargs from "yargs";
import reactUiCommand from "../template/ui/react/command/reactUiCommand";
import vueUiCommand from "../template/ui/vue/command/vueUiCommand";
import vueUiRollbackCommand from "../template/ui/vue/command/vueUiRollbackCommand";
import chalk from "chalk";
import reactUiRollbackCommand from "../template/ui/react/command/reactUiRollbackCommand";
import bootstrapUiCommand from "../template/ui/bootstrap/command/bootstrapUiCommand";
import { execSync } from "child_process";

export default yargs.command({
  command: "generate:ui",
  describe:
    "Generate front-end scaffolding for the application preset type (vue, react)",
  builder: {
    type: {
      alias: "t",
      required: true,
      type: "string",
    },
    rollback: {
      alias: "r",
      required: false,
      type: "boolean",
      default: false,
    },
  },
  async handler(argv: any) {
    switch (argv.type) {
      case "react":
        if (!argv.rollback) {
          await vueUiRollbackCommand.handle();
          await reactUiCommand.handle();
          console.log(chalk.green(`React scaffolding installed successfully.`));
        } else {
          await reactUiRollbackCommand.handle();
          await bootstrapUiCommand.handle();
          console.log(chalk.green(`React scaffolding rollback successfully.`));
        }

        try {
          execSync("npm install", { stdio: "inherit" });
        } catch (error) {
          console.log(error);
          process.exit(1);
        }

        try {
          execSync("npm run prod", { stdio: "inherit" });
        } catch (error) {
          console.log(error);
          process.exit(1);
        }

        break;
      case "vue":
        if (!argv.rollback) {
          await reactUiRollbackCommand.handle();
          await vueUiCommand.handle();
          console.log(chalk.green(`Vue scaffolding installed successfully.`));
        } else {
          await vueUiRollbackCommand.handle();
          await bootstrapUiCommand.handle();
          console.log(chalk.green(`Vue scaffolding rollback successfully.`));
        }

        try {
          execSync("npm install", { stdio: "inherit" });
        } catch (error) {
          console.log(error);
          process.exit(1);
        }

        try {
          execSync("npm run prod", { stdio: "inherit" });
        } catch (error) {
          console.log(error);
          process.exit(1);
        }

        break;
      // case "bootstrap":
      //   await vueUiRollbackCommand.handle();
      //   await reactUiRollbackCommand.handle();
      //   await bootstrapUiCommand.handle();
      //   console.log(
      //     chalk.green(`Bootstrap scaffolding installed successfully.`)
      //   );

      //   try {
      //     execSync("npm install", { stdio: "inherit" });
      //   } catch (error) {
      //     console.log(error);
      //     process.exit(1);
      //   }

      //   try {
      //     execSync("npm run prod", { stdio: "inherit" });
      //   } catch (error) {
      //     console.log(error);
      //     process.exit(1);
      //   }
      //   break;
      default:
        console.log(chalk.red(`scaffold not found!`));
        break;
    }
  },
});
