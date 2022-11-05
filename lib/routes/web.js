exports.default = async (app) => {
  const { default: Route } = require("../vendor/route/route");
  const route = new Route(app);

  await route.middlewares(["user_is_login"], () => {
    route
      .get("/register", ["auth/register.controller", "index"])
      .name("register_user");
    route
      .post("/register", ["auth/register.controller", "create"])
      .name("register");
    route.get("/login", ["auth/login.controller", "index"]).name("login");
    route
      .post("/login", ["auth/login.controller", "login"])
      .name("login_attempt");
  });

  await route.middlewares(["user_not_login"], async () => {
    route
      .get("/", function () {
        return view("welcome", { layout: "nolla/templates/app" });
      })
      .name("home");

    await route.prefix("user", () => {
      route.get("/", ["user.controller", "index"]).name("user.index");
      route.get("/create", ["user.controller", "create"]).name("user.create");
      route.post("/", ["user.controller", "store"]).name("user.store");
      route.get("/:id/edit", ["user.controller", "edit"]).name("user.edit");
      route
        .post("/:id/update", ["user.controller", "update"])
        .name("user.update");
    });

    route.get("/log-out", ["auth/login.controller", "logout"]).name("logout");
  });
};
