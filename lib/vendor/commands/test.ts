import yargs from "yargs";

export default yargs.command({
  command: "test",
  describe: "Create a new migration files",
  async handler(argv) {
    require("../../tests");
  },
});
