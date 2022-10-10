import { Express } from "express";
import { Request, Response } from "express";
import RouteService from "../../app/services/route.service";
import RouteDefaultService from "../providers/route.default.service";

export default class Route {
  app: Express;
  controllerNameSpace: string;

  constructor(app: Express) {
    this.app = app;
    const nameSpace = new RouteService().controllerNameSpace;
    if (nameSpace != null) {
      this.controllerNameSpace = nameSpace;
    }
  }

  get(
    url: string,
    argv: [controllerClassPath: string, method: string] | Function
  ) {
    const self = this;
    this.app.get(url, async function (req: Request, res: Response) {
      let cb = null;
      new RouteDefaultService()._request(req);

      if (Array.isArray(argv)) {
        const path = require("path");
        let controllerPath = `${path.dirname(require.main?.filename)}${
          argv[0]
        }`;

        if (self.controllerNameSpace != null) {
          controllerPath = `${path.dirname(require.main?.filename)}${
            self.controllerNameSpace
          }${argv[0]}`;
        }

        const p = require(controllerPath);
        const c = new p();
        cb = await c[argv[1]](...new RouteDefaultService().params(req));
      } else {
        cb = await argv(...new RouteDefaultService().params(req));
      }

      if (typeof cb == "function") {
        const cb2 = cb();
        if (cb2.data != null && cb2.code != null) {
          return res.status(cb2.code).json(cb2.data);
        }
      }

      res.send(cb);
    });
  }

  post(
    url: string,
    argv: [controllerClassPath: string, method: string] | Function
  ) {
    const self = this;

    this.app.post(url, async function (req: Request, res: Response) {
      let cb = null;
      new RouteDefaultService()._request(req);

      if (Array.isArray(argv)) {
        const path = require("path");
        let controllerPath = `${path.dirname(require.main?.filename)}${
          argv[0]
        }`;

        if (self.controllerNameSpace != null) {
          controllerPath = `${path.dirname(require.main?.filename)}${
            self.controllerNameSpace
          }${argv[0]}`;
        }

        const p = require(controllerPath);
        const c = new p();
        cb = await c[argv[1]](...new RouteDefaultService().params(req));
      } else {
        cb = await argv(...new RouteDefaultService().params(req));
      }

      if (typeof cb == "function") {
        const cb2 = cb();
        if (cb2.data != null && cb2.code != null) {
          return res.status(cb2.code).json(cb2.data);
        }
      }

      res.send(cb);
    });
  }
}