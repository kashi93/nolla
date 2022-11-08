var Route = require("../vendor/route/route").default;
Route.middleware("user_not_login", function () {
  Route.get("/", function () {
    return view("welcome", { layout: "nolla/templates/app" });
  }).name("home");
  Route.prefix("user", function () {
    Route.get("/", ["user.controller", "index"]).name("user.index");
    Route.get("/create", ["user.controller", "create"]).name("user.create");
    Route.post("/", ["user.controller", "store"]).name("user.store");
    Route.get("/:id/edit", ["user.controller", "edit"]).name("user.edit");
    Route.post("/:id/update", ["user.controller", "update"]).name(
      "user.update"
    );
  });
  Route.get("/log-out", ["auth/login.controller", "logout"]).name("logout");
});
Route.middleware("user_is_login", function () {
  Route.get("/register", ["auth/register.controller", "index"]).name(
    "register_user"
  );
  Route.post("/register", ["auth/register.controller", "create"]).name(
    "register"
  );
  Route.get("/login", ["auth/login.controller", "index"]).name("login");
  Route.post("/login", ["auth/login.controller", "login"]).name(
    "login_attempt"
  );
});
