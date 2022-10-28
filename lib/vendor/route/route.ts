import { Express } from "express";
import { Request, Response, Next } from "../../";
import RouteService from "../../app/services/route.service";
const RouteDefaultService = require("../providers/route.default.service");

let middlewareList: any = [];

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
    this.app.get(
      url,
      ...middlewareList,
      async function (req: Request, res: Response, next: Next) {
        try {
          let cb = null;

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
            cb = await c[argv[1]](
              ...new RouteDefaultService().params(req, res)
            );
          } else {
            cb = await argv(...new RouteDefaultService().params(req, res));
          }

          if (typeof cb == "function") {
            const cb2 = cb();
            if (cb2.data != null && cb2.code != null) {
              return res.status(cb2.code).json(cb2.data);
            } else if (cb2.view != null && cb2.data != null) {
              return res.render(cb2.view, cb2.data);
            }
          }

          try {
            res.status(200).send(cb.toString());
          } catch (error) {}
        } catch (error) {
          next(error);
        }
      }
    );

    return this.callback(url, argv);
  }

  post(
    url: string,
    argv: [controllerClassPath: string, method: string] | Function
  ) {
    const self = this;

    this.app.post(
      url,
      ...middlewareList,
      async function (req: Request, res: Response, next: Next) {
        try {
          let cb = null;

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
            cb = await c[argv[1]](
              ...new RouteDefaultService().params(req, res)
            );
          } else {
            cb = await argv(...new RouteDefaultService().params(req, res));
          }

          if (typeof cb == "function") {
            const cb2 = cb();
            if (cb2.data != null && cb2.code != null) {
              return res.status(cb2.code).json(cb2.data);
            }
          }

          try {
            res.send(cb.toString());
          } catch (error) {}
        } catch (error) {
          next(error);
        }
      }
    );

    return this.callback(url, argv);
  }

  async middlewares(arg: Function[], routes: Function): Promise<void> {
    middlewareList = arg;
    await routes();
    middlewareList = [];
  }

  callback(url: any, argv: any) {
    return {
      url,
      argv,
      name: function (name: string) {
        if (routeList.filter((r) => r.name == name).length < 1) {
          routeList.push({
            name,
            url: this.url,
            argv: this.argv,
          });
        }
      },
    };
  }
}
