"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewService = void 0;
var nolla_core_1 = require("nolla-core");
var ViewService = /** @class */ (function () {
    function ViewService() {
    }
    ViewService.prototype.boot = function (app) {
        this.register(app);
    };
    ViewService.prototype.register = function (app) {
        (0, nolla_core_1.ReactRouter)(app);
    };
    return ViewService;
}());
exports.ViewService = ViewService;
