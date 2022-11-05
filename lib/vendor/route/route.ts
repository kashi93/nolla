import { Express } from "express";
import { Request, Response, Next } from "../../";
import RouteService from "../../app/services/route.service";
import ResponseJsonSerialize from "./responseJsonSerialize";
const RouteDefaultService = require("../providers/route.default.service");

let middlewareList: string[] = [];
let prefix: string;

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
    const path = require("path");
    const self = this;
    const middlewares: any = [];
    let fullUrl = url;

    if (prefix != null) {
      fullUrl = `/${prefix}${fullUrl}`;
    }

    for (const m of middlewareList) {
      if (config("app.routeMiddleware")[m] == null) {
        throw new Error(
          `Route middleware ${m} does not exist or does not register`
        );
      }
      const { default: p } = require(`${path.dirname(require.main?.filename)}/${
        config("app.routeMiddleware")[m]
      }`);
      middlewares.push(p);
    }

    if (
      routeList.filter((r) => r.url == fullUrl && r.method == "GET").length < 1
    ) {
      routeList.push({
        name: "",
        url: fullUrl,
        method: "GET",
        argv: argv,
        middleware: middlewares,
      });
    }

    this.app.get(
      fullUrl,
      ...middlewares,
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
              return res.render(cb2.view, {
                layout: false,
                ...cb2.data,
              });
            }
          }

          try {
            if (cb != null) {
              if (typeof cb == "object") {
                res.status(200).send(await ResponseJsonSerialize.serialize(cb));
              } else {
                res.status(200).send(cb.toString());
              }
            } else {
              res.status(200).send("");
            }
          } catch (error) {}
        } catch (error) {
          next(error);
        }
      }
    );

    return {
      name: (name: string) => {
        const index = routeList.findIndex(
          (r) => r.url == fullUrl && r.method == "GET"
        );

        if (index != -1) {
          routeList[index].name = name;
        }
      },
    };
  }

  post(
    url: string,
    argv: [controllerClassPath: string, method: string] | Function
  ) {
    const path = require("path");
    const self = this;
    const middlewares: any = [];
    let fullUrl = url;

    if (prefix != null) {
      fullUrl = `/${prefix}${fullUrl}`;
    }

    for (const m of middlewareList) {
      if (config("app.routeMiddleware")[m] == null) {
        throw new Error(
          `Route middleware ${m} does not exist or does not register`
        );
      }
      const { default: p } = require(`${path.dirname(require.main?.filename)}/${
        config("app.routeMiddleware")[m]
      }`);
      middlewares.push(p);
    }

    if (
      routeList.filter((r) => r.url == fullUrl && r.method == "POST").length < 1
    ) {
      routeList.push({
        name: "",
        url: fullUrl,
        method: "POST",
        argv: argv,
        middleware: middlewares,
      });
    }

    this.app.post(
      fullUrl,
      ...middlewares,
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
            if (cb != null) {
              if (typeof cb == "object") {
                res.status(200).send(await ResponseJsonSerialize.serialize(cb));
              } else {
                res.status(200).send(cb.toString());
              }
            } else {
              res.status(200).send("");
            }
          } catch (error) {}
        } catch (error) {
          next(error);
        }
      }
    );

    return {
      name: (name: string) => {
        const index = routeList.findIndex(
          (r) => r.url == fullUrl && r.method == "POST"
        );

        if (index != -1) {
          routeList[index].name = name;
        }
      },
    };
  }

  async middlewares(arg: string[], routes: Function): Promise<void> {
    middlewareList = arg;
    await routes();
    middlewareList = [];
  }

  async prefix(name: string, routes: Function) {
    prefix = name;
    await routes();
    prefix = null;
  }
}
