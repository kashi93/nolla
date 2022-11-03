import yargs from "yargs";

module.exports = (() => {
  require("./makeMigration");
  require("./makeMigrate");
  require("./makeModel");
  require("./generateUi");
  require("./makeServer");
  require("./makeTest");
  yargs.parse();
})();
