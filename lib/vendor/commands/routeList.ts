import yargs from "yargs";
import RouteService from "../../app/services/route.service";
import RouteRegister from "../route/routeRegister";

export default yargs.command({
  command: "route:list",
  describe: "List all registered routes",
  builder: {},
  async handler(argv: any) {
    new RouteService().boot();
    const routerReg = new RouteRegister();
    await routerReg.register();
    console.table(routeList);
  },
});
