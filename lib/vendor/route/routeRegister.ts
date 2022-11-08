import { routeCollection } from "./routeCollection";
import { Express } from "express";
import { Request, Response, Next } from "../../";
import ResponseJsonSerialize from "./responseJsonSerialize";
const RouteDefaultService = require("../providers/route.default.service");

export default class RouteRegister {
  middlewares: string[] = [];
  prefixs: string[] = [];
  controllerNamespaces: string[] = [];
  initializations: Array<(app: Express) => void> = [];

  async register() {
    for await (const route of routeCollection) {
      if (route.startControllerNameSpace) {
        this.controllerNamespaces.push(route.controllerNameSpace);
      }

      if (route.startMiddleware) {
        this.middlewares.push(route.middleware);
      }

      if (route.startPrefix) {
        this.prefixs.push(route.prefix);
      }

      if (route.method != null) {
        let controller: string | Function;
        const url: string[] = [];
        for await (const prex of this.prefixs) {
          if (prex.trim().length > 0) {
            url.push(prex);
          }
        }

        for await (const u of route.url.split("/")) {
          if (u.trim().length > 0) {
            url.push(u);
          }
        }

        if (Array.isArray(route.argv)) {
          controller = `${this.controllerNamespaces}${route.argv[0]}@${route.argv[1]}`;
        } else {
          controller = route.argv;
        }

        if (
          routeList.filter(
            (r) => r.url == "/" + url.join("/") && r.method == route.method
          ).length < 1
        ) {
          const middleware = [...this.middlewares];
          routeList.push({
            name: route.name,
            url: "/" + url.join("/"),
            method: route.method,
            controller,
            middleware,
          });

          this.initializations.push((app) => {
            switch (route.method) {
              case "GET":
                this.get(app, "/" + url.join("/"), controller, middleware);
                break;
              case "POST":
                this.post(app, "/" + url.join("/"), controller, middleware);
                break;

              default:
                break;
            }
          });
        }
      }

      if (route.endControllerNameSpace) {
        this.controllerNamespaces.pop();
      }

      if (route.endPrefix) {
        this.prefixs.pop();
      }

      if (route.endMiddleware) {
        this.middlewares.pop();
      }
    }
  }

  get(
    app: Express,
    url: string,
    controller: string | Function,
    middlewareList: string[]
  ) {
    const path = require("path");
    const middlewares: any = [];

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

    app.get(
      url,
      ...middlewares,
      async function (req: Request, res: Response, next: Next) {
        try {
          let cb = null;
          if (typeof controller == "string") {
            const p = require(`${path.dirname(require.main?.filename)}${
              controller.split("@")[0]
            }`);
            const c = new p();
            cb = await c[controller.split("@")[1]](
              ...new RouteDefaultService().params(req, res)
            );
          } else {
            cb = await controller(
              ...new RouteDefaultService().params(req, res)
            );
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
  }

  post(
    app: Express,
    url: string,
    controller: string | Function,
    middlewareList: string[]
  ) {
    const path = require("path");
    const middlewares: any = [];

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

    app.post(
      url,
      ...middlewares,
      async function (req: Request, res: Response, next: Next) {
        try {
          let cb = null;
          if (typeof controller == "string") {
            const p = require(`${path.dirname(require.main?.filename)}${
              controller.split("@")[0]
            }`);
            const c = new p();
            cb = await c[controller.split("@")[1]](
              ...new RouteDefaultService().params(req, res)
            );
          } else {
            cb = await controller(
              ...new RouteDefaultService().params(req, res)
            );
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
  }

  async initialize(app: Express) {
    for await (const i of this.initializations) {
      i(app);
    }
  }
}
