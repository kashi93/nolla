"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteService = void 0;
var nolla_core_1 = require("nolla-core");
var RouteService = /** @class */ (function () {
    function RouteService() {
    }
    RouteService.prototype.boot = function () {
        this.register();
    };
    RouteService.prototype.register = function () {
        nolla_core_1.Route.prefix("api", function () { return require("../../routes/api"); });
    };
    return RouteService;
}());
exports.RouteService = RouteService;
