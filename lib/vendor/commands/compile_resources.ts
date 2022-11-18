import { copy } from "../rainbows/copy";
import yargs from "yargs";
import chalk from "chalk";

export default yargs.command({
  command: "compile:resources",
  describe: "compile all lib/resources/**/* to build/resources/**/*",
  builder: {},
  async handler(argv: any) {
    await copy(
      `${process.cwd()}/lib/resources`,
      `${process.cwd()}/build/resources`
    );
    console.log(chalk.green(`Resources successfully compiled.`));
  },
});
