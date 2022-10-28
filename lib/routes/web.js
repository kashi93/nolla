const {
  userNotLoginMiddleware,
} = require("../app/middlewares/userNotLogin.middleware");
const {
  userIsLoginMiddleware,
} = require("../app/middlewares/userIsLogin.middleware");
exports.default = async (app) => {
  const { default: Route } = require("../vendor/route/route");
  const route = new Route(app);

  await route.middlewares([userNotLoginMiddleware], () => {
    route
      .get("/", function () {
        return view("welcome", { layout: "nolla/templates/app" });
      })
      .name("home");
    route.get("/log-out", ["auth/login.controller", "logout"]).name("logout");
  });

  await route.middlewares([userIsLoginMiddleware], () => {
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
};
