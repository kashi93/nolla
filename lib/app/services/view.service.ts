import { Express } from "express";
import { ReactRouter, type Provider } from "nolla-core";

export class ViewService implements Provider {
    boot(app: Express) {
        this.register(app);
    }

    register(app: Express) {
        ReactRouter(app);
    }
}
