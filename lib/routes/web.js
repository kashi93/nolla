exports.default = async (app) => {
  const { default: Route } = require("../vendor/route/route");
  const route = new Route(app);
  const { authMiddleware } = require("../app/middlewares/auth.middleware");

  await route.middlewares([authMiddleware], () => {
    route
      .get("/", function () {
        return view("welcome");
      })
      .name("home");
  });

  route.get("/test", ["example.controller", "sayHello"]);
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
};
