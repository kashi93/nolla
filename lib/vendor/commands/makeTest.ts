import yargs from "yargs";

export default yargs.command({
  command: "test",
  describe: "Run the application tests",
  builder: {},
  async handler(argv) {
    require("../../tests");
  },
});
