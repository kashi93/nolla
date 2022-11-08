import { Express } from "express";
export default class RouteRegister {
    middlewares: string[];
    prefixs: string[];
    controllerNamespaces: string[];
    initializations: Array<(app: Express) => void>;
    register(): Promise<void>;
    get(app: Express, url: string, controller: string | Function, middlewareList: string[]): void;
    post(app: Express, url: string, controller: string | Function, middlewareList: string[]): void;
    initialize(app: Express): Promise<void>;
}
