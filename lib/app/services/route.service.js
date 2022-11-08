const { default: Route } = require("../../vendor/route/route");

class RouteService {
  boot(app) {
    this.register(app);
  }

  register(app) {
    Route.controllerNameSpace("/app/controllers/", () =>
      Route.middleware("web", () => require("../../routes/web"))
    );
  }
}

module.exports = RouteService;
