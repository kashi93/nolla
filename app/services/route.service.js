var Route = require("../../vendor/route/route").default;
var RouteService = /** @class */ (function () {
    function RouteService() {
    }
    RouteService.prototype.boot = function (app) {
        this.register(app);
    };
    RouteService.prototype.register = function (app) {
        Route.controllerNameSpace("/app/controllers/", function () {
            return Route.middleware("web", function () { return require("../../routes/web"); });
        });
    };
    return RouteService;
}());
module.exports = RouteService;
