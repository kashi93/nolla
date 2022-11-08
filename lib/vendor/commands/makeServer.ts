import express, { Express } from "express";
import yargs from "yargs";
import { storeError } from "../error_handler/storeError";
import RouteRegister from "../route/routeRegister";

export default yargs.command({
  command: "serve",
  describe: "Serve the application on the express development server",
  builder: {},
  async handler(argv) {
    const app: Express = express();
    const host = config("app.app_url");
    const port = config("app.app_port");
    const app_name = config("app.name");

    app.use(express.static(`${process.cwd()}/public`));

    for await (const prov of config("app.providers")) {
      const path = require("path");
      const p = require(`${path.dirname(require.main?.filename)}/${prov}`);
      const c = new p();
      c.boot(app);
    }

    const routerReg = new RouteRegister();

    await routerReg.register();
    await routerReg.initialize(app);

    app.use((err: any, req: any, res: any, next: any) => {
      try {
        storeError(err);
        res.send(err.stack);
      } catch (error) {}
    });

    app.listen(
      port,
      String(host)
        .replace(/^https?:\/\//, "")
        .replace(/^http?:\/\//, ""),
      () => {
        console.log(`${app_name} app listening at ${host}:${port}`);
      }
    );
  },
});
