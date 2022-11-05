import yargs from "yargs";

export default yargs.command({
  command: "route:list",
  describe: "List all registered routes",
  builder: {},
  async handler(argv: any) {
    console.log(routeList);
  },
});
