const {
  default: RouteDefaultService,
} = require("../../vendor/providers/route.default.service");

class RouteService extends RouteDefaultService {
  controllerNameSpace = "/app/controllers/";

  boot(app) {
    this.default(app);
    this.register(app);
    this.log(app);
    this.route(app);
  }

  register(app) {}
}

module.exports = RouteService;
