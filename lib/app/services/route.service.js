class RouteService {
  controllerNameSpace = "/app/controllers/";

  boot(app) {
    this.register(app);
  }

  register(app) {}
}

module.exports = RouteService;
