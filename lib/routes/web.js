exports.default = (app) => {
  const { default: Route } = require("../vendor/route/route");
  const route = new Route(app);

  route
    .get("/", function () {
      return view("welcome");
    })
    .name("home");

  route.get("/test", ["example.controller", "sayHello"]);
  route
    .get("/register", ["auth/register.controller", "index"])
    .name("register_user");
  route.post("/register", ["auth/register.controller", "create"]);
};
