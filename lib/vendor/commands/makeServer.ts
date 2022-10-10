import express, { Express } from "express";
import yargs from "yargs";
import RouteService from "../../app/services/route.service";

export default yargs.command({
  command: "serve",
  describe: "Serve the application on the express development server",
  builder: {},
  async handler(argv) {
    const app: Express = express();
    const host = config("app.app_url");
    const port = config("app.app_port");
    const app_name = config("app.name");
    const service = new RouteService();
    service.boot(app);

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
