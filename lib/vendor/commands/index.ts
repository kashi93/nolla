import yargs from "yargs";

module.exports = (() => {
  require("./makeMigration");
  require("./makeMigrate");
  require("./test");
  yargs.parse();
})();
