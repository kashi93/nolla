import { Express } from "express";
import { dateTime } from "../rainbows/dateTime";
import { Request } from "../../";
import Validator from "../controller/validator";
import { Rule } from "../../";
import RequestDefault from "../route/request.default";

class RouteDefaultService extends RequestDefault {
  boot(app: Express) {
    this.default(app);
    this.log(app);
    this.catchExpressData(app);
    this.route(app);
  }

  default(app: Express) {
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }

  catchExpressData(app: Express) {
    const path = require("path");
    const multer = require("multer");
    const upload = multer({
      dest: `${path.dirname(require.main?.filename)}/storage/cache`,
    });

    app.use(upload.any(), (req, res, next) => {
      response = res;
      this._request(req as any);
      next();
    });
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

        clearFormValidationSession();
        clearFormValuesSession();
      });

      next();
    });
  }

  route(app: Express) {
    const { default: routes } = require("../../routes/web");
    routes(app);
  }

  params(req: Request, res: Response): any[] {
    const data: any[] = [];
    const keys = Object.getOwnPropertyNames(req.params);
    for (const key of keys) {
      data.push(req.params[key]);
    }
    req = this.appendToRequest(req);
    data.push(req);
    data.push(res);
    return data;
  }

  async _request(req: Request): Promise<void> {
    this.generateRequest(req);

    if (req.method == "POST") {
      values = {
        ...req.body,
      };
    }
  }

  appendToRequest(req: any) {
    // req.validate = (rule: Rule) => {
    //   new Validator().validate(req, rule);
    // };
    return req;
  }
}

module.exports = RouteDefaultService;
