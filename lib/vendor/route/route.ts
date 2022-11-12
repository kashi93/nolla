import { routeCollection as c } from "./routeCollection";
import { v4 as uuidv4 } from "uuid";

class Route {
  middleware(middleware: string[] | string, routes: Function) {
    let list = middleware;

    if (typeof middleware == "string") {
      list = [middleware];
    }

    for (const l of list) {
      c.push({
        uuid: uuidv4(),
        startControllerNameSpace: false,
        controllerNameSpace: null,
        endControllerNameSpace: false,
        startMiddleware: true,
        middleware: l,
        endMiddleware: false,
        startPrefix: false,
        prefix: null,
        endPrefix: false,
        url: null,
        argv: null,
        method: null,
        name: null,
      });
    }

    routes();

    for (const l of list) {
      c.push({
        uuid: uuidv4(),
        startControllerNameSpace: false,
        controllerNameSpace: null,
        endControllerNameSpace: false,
        startMiddleware: false,
        middleware: null,
        endMiddleware: true,
        startPrefix: false,
        prefix: null,
        endPrefix: false,
        url: null,
        argv: null,
        method: null,
        name: null,
      });
    }
  }

  get(
    url: string,
    argv: [controllerClassPath: string, method: string] | Function
  ) {
    const uuid = uuidv4();

    c.push({
      uuid,
      startControllerNameSpace: false,
      controllerNameSpace: null,
      endControllerNameSpace: false,
      startMiddleware: false,
      middleware: null,
      endMiddleware: false,
      startPrefix: false,
      prefix: null,
      endPrefix: false,
      url,
      argv,
      method: "GET",
      name: null,
    });

    return {
      name: (name: string) => {
        const i = c.findIndex((_c) => _c.uuid == uuid);
        if (i != -1) {
          c[i].name = name;
        }
      },
    };
  }

  post(
    url: string,
    argv: [controllerClassPath: string, method: string] | Function
  ) {
    const uuid = uuidv4();

    c.push({
      uuid,
      startControllerNameSpace: false,
      controllerNameSpace: null,
      endControllerNameSpace: false,
      startMiddleware: false,
      middleware: null,
      endMiddleware: false,
      startPrefix: false,
      prefix: null,
      endPrefix: false,
      url,
      argv,
      method: "POST",
      name: null,
    });

    return {
      name: (name: string) => {
        const i = c.findIndex((_c) => _c.uuid == uuid);
        if (i != -1) {
          c[i].name = name;
        }
      },
    };
  }

  prefix(prefix: string, routes: Function) {
    c.push({
      uuid: uuidv4(),
      startControllerNameSpace: false,
      controllerNameSpace: null,
      endControllerNameSpace: false,
      startMiddleware: false,
      middleware: null,
      endMiddleware: false,
      startPrefix: true,
      prefix,
      endPrefix: false,
      url: null,
      argv: null,
      method: null,
      name: null,
    });

    routes();

    c.push({
      uuid: uuidv4(),
      startControllerNameSpace: false,
      controllerNameSpace: null,
      endControllerNameSpace: false,
      startMiddleware: false,
      middleware: null,
      endMiddleware: false,
      startPrefix: false,
      prefix: null,
      endPrefix: true,
      url: null,
      argv: null,
      method: null,
      name: null,
    });
  }

  controllerNameSpace(controllerNameSpace: string, routes: Function) {
    c.push({
      uuid: uuidv4(),
      startControllerNameSpace: true,
      controllerNameSpace,
      endControllerNameSpace: false,
      startMiddleware: false,
      middleware: null,
      endMiddleware: false,
      startPrefix: false,
      prefix: null,
      endPrefix: false,
      url: null,
      argv: null,
      method: null,
      name: null,
    });

    routes();

    c.push({
      uuid: uuidv4(),
      startControllerNameSpace: false,
      controllerNameSpace: null,
      endControllerNameSpace: false,
      startMiddleware: false,
      middleware: null,
      endMiddleware: false,
      startPrefix: false,
      prefix: null,
      endPrefix: false,
      url: null,
      argv: null,
      method: null,
      name: null,
    });
  }
}

export default new Route();
