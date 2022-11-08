"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routeCollection_1 = require("./routeCollection");
var uuid_1 = require("uuid");
var Route = /** @class */ (function () {
    function Route() {
    }
    Route.prototype.middleware = function (middleware, routes) {
        var list = middleware;
        if (typeof middleware == "string") {
            list = [middleware];
        }
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var l = list_1[_i];
            routeCollection_1.routeCollection.push({
                uuid: (0, uuid_1.v4)(),
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
        for (var _a = 0, list_2 = list; _a < list_2.length; _a++) {
            var l = list_2[_a];
            routeCollection_1.routeCollection.push({
                uuid: (0, uuid_1.v4)(),
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
    };
    Route.prototype.get = function (url, argv) {
        var uuid = (0, uuid_1.v4)();
        routeCollection_1.routeCollection.push({
            uuid: uuid,
            startControllerNameSpace: false,
            controllerNameSpace: null,
            endControllerNameSpace: false,
            startMiddleware: false,
            middleware: null,
            endMiddleware: false,
            startPrefix: false,
            prefix: null,
            endPrefix: false,
            url: url,
            argv: argv,
            method: "GET",
            name: null,
        });
        return {
            name: function (name) {
                var i = routeCollection_1.routeCollection.findIndex(function (_c) { return _c.uuid == uuid; });
                if (i != -1) {
                    routeCollection_1.routeCollection[i].name = name;
                }
            },
        };
    };
    Route.prototype.post = function (url, argv) {
        var uuid = (0, uuid_1.v4)();
        routeCollection_1.routeCollection.push({
            uuid: uuid,
            startControllerNameSpace: false,
            controllerNameSpace: null,
            endControllerNameSpace: false,
            startMiddleware: false,
            middleware: null,
            endMiddleware: false,
            startPrefix: false,
            prefix: null,
            endPrefix: false,
            url: url,
            argv: argv,
            method: "POST",
            name: null,
        });
        return {
            name: function (name) {
                var i = routeCollection_1.routeCollection.findIndex(function (_c) { return _c.uuid == uuid; });
                if (i != -1) {
                    routeCollection_1.routeCollection[i].name = name;
                }
            },
        };
    };
    Route.prototype.prefix = function (prefix, routes) {
        routeCollection_1.routeCollection.push({
            uuid: (0, uuid_1.v4)(),
            startControllerNameSpace: false,
            controllerNameSpace: null,
            endControllerNameSpace: false,
            startMiddleware: false,
            middleware: null,
            endMiddleware: false,
            startPrefix: true,
            prefix: prefix,
            endPrefix: false,
            url: null,
            argv: null,
            method: null,
            name: null,
        });
        routes();
        routeCollection_1.routeCollection.push({
            uuid: (0, uuid_1.v4)(),
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
    };
    Route.prototype.controllerNameSpace = function (controllerNameSpace, routes) {
        routeCollection_1.routeCollection.push({
            uuid: (0, uuid_1.v4)(),
            startControllerNameSpace: true,
            controllerNameSpace: controllerNameSpace,
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
        routeCollection_1.routeCollection.push({
            uuid: (0, uuid_1.v4)(),
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
    };
    return Route;
}());
exports.default = new Route();
