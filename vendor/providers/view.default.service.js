"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewDefaultService = /** @class */ (function () {
    function ViewDefaultService() {
    }
    ViewDefaultService.prototype.boot = function (app) {
        var _a;
        var path = require("path");
        var expressLayouts = require("express-ejs-layouts");
        app.set("views", path.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename) + "/resources/views");
        app.set("view engine", "ejs");
        app.use(expressLayouts);
    };
    return ViewDefaultService;
}());
module.exports = ViewDefaultService;
