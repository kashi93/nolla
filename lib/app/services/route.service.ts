import { Express } from "express";
import { default as Route } from "../../vendor/route/route";

class RouteService {
  boot(app?: Express) {
    this.register(app);
  }

  register(app?: Express) {
    Route.controllerNameSpace("/app/controllers/", () =>
      Route.middleware("web", () => require("../../routes/web"))
    );
  }
}

export = RouteService;
