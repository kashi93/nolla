import { Express } from "express";
import { dateTime } from "../rainbows/dateTime";
import { Request } from "express";

class RouteDefaultService {
  boot(app: Express) {
    this.default(app);
    this.log(app);
    this.route(app);
  }

  default(app: Express) {
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }

  log(app: Express) {
    app.enable("trust proxy");
    app.use((req, res, next) => {
      let ip: any =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
      }

      console.log(`[${dateTime()}] ${ip}:${req.socket.remotePort} Accepted`);
      req.on("close", function () {
        console.log(
          `[${dateTime()}] ${ip}:${req.socket.remotePort} [${
            res.statusCode
          }]: ${req.method.toLocaleUpperCase()} ${req.path}`
        );

        console.log(`[${dateTime()}] ${ip}:${req.socket.remotePort} Closing`);
      });

      next();
    });
  }

  route(app: Express) {
    const { default: routes } = require("../../routes/web");
    routes(app);
  }

  params(req: Request): any[] {
    const data: any[] = [];
    const keys = Object.getOwnPropertyNames(req.params);
    for (const key of keys) {
      data.push(req.params[key]);
    }

    return data;
  }

  _request(req: Request): void {
    request = {
      ...req.query,
      ...req.body,
    };
  }
}

module.exports = RouteDefaultService;
