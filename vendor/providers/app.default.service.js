"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppDefaultService = /** @class */ (function () {
    function AppDefaultService() {
    }
    AppDefaultService.prototype.boot = function (app) {
        var cookieParser = require("cookie-parser");
        app.use(cookieParser());
    };
    return AppDefaultService;
}());
module.exports = AppDefaultService;
