import yargs from "yargs";

module.exports = (() => {
  require("./makeMigration");
  require("./makeMigrate");
  require("./makeModel");
  require("./makeServer");
  yargs.parse();
})();
