import type { Provider } from "nolla-core";
import { Route } from "nolla-core";

export class RouteService implements Provider {
  boot() {
    this.register();
  }

  register() {
    Route.prefix("api", () => require("../../routes/api"))
  }
}
