"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var route_service_1 = require("../app/services/route.service");
var web_1 = __importDefault(require("../app/middleware/web"));
var exceptionKernel_1 = require("../app/exception/exceptionKernel");
var view_service_1 = require("../app/services/view.service");
var app = {
    name: env("APP_NAME") || "Nolla",
    timezone: env("TZ") || "UTC",
    appUrl: env("APP_URL") || "http://localhost",
    appPort: Number(env("APP_PORT")) || 3000,
    appKey: env("APP_KEY"),
    providers: [
        view_service_1.ViewService,
        route_service_1.RouteService,
        exceptionKernel_1.ExceptionKernel
    ],
    routeMiddleware: {
        "web": web_1.default,
    }
};
module.exports = app;
