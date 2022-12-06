import yargs from "yargs";

module.exports = (() => {
  yargs
    .command(require("./makeMigration"))
    .command(require("./makeMigrate"))
    .command(require("./makeModel"))
    .command(require("./makeController"))
    .command(require("./generateUi"))
    .command(require("./makeServer"))
    .command(require("./makeTest"))
    .command(require("./compile_resources"))
    .command(require("./routeList"))
    .showHelpOnFail(true)
    .help("help", "Show usage instructions.")
    .command({
      command: "*",
      handler() {
        yargs.showHelp();
      },
    })
    .demandCommand().argv;
})();
