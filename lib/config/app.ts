import type { AppConfig } from "nolla-core";
import { RouteService } from "../app/services/route.service";
import Web from "../app/middleware/web";
import { ExceptionKernel } from "../app/exception/exceptionKernel";
import { ViewService } from "../app/services/view.service";

const app: AppConfig = {
    name: env("APP_NAME","Nolla"),
    timezone: env("TZ","UTC"),
    appUrl: env("APP_URL","http://localhost"),
    appPort: Number(env("APP_PORT","3000")),
    appKey: env("APP_KEY"),
    providers: [
        ViewService,
        RouteService,
        ExceptionKernel
    ],
    routeMiddleware: {
        "web": Web,
    }
}

export = app;