exports.default = (app) => {
  const { default: Route } = require("../vendor/route/route");
  const route = new Route(app);

  route.get("/", function () {
    return "Welcome to nolla";
  });

  route.get("/test", ["example.controller", "sayHello"]);
};
