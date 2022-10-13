import express, { Express } from "express";
import yargs from "yargs";

export default yargs.command({
  command: "serve",
  describe: "Serve the application on the express development server",
  builder: {},
  async handler(argv) {
    const app: Express = express();
    const host = config("app.app_url");
    const port = config("app.app_port");
    const app_name = config("app.name");

    for await (const prov of config("app.providers")) {
      const path = require("path");
      const p = require(`${path.dirname(require.main?.filename)}/${prov}`);
      const c = new p();
      c.boot(app);
    }

    app.use(express.static(`${process.cwd()}/public`));

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
