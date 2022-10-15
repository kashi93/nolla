import yargs from "yargs";
import reactUiCommand from "../template/ui/react/command/reactUiCommand";
import vueUiCommand from "../template/ui/vue/command/vueUiCommand";
import vueUiRollbackCommand from "../template/ui/vue/command/vueUiRollbackCommand";
import chalk from "chalk";
import reactUiRollbackCommand from "../template/ui/react/command/reactUiRollbackCommand";

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
    switch (argv.type) {
      case "react":
        await vueUiRollbackCommand.handle();
        await reactUiCommand.handle();
        console.log(chalk.green(`React scaffolding installed successfully.`));
        console.log(
          chalk.yellow(
            `Please run "npm install && npm run prod" to compile your fresh scaffolding.`
          )
        );
        break;
      case "vue":
        await reactUiRollbackCommand.handle();
        await vueUiCommand.handle();
        console.log(chalk.green(`Vue scaffolding installed successfully.`));
        console.log(
          chalk.yellow(
            `Please run "npm install && npm run prod" to compile your fresh scaffolding.`
          )
        );
        break;
      default:
        break;
    }
  },
});
