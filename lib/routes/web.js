exports.default = (app) => {
  const { default: Route } = require("../vendor/route/route");
  const route = new Route(app);

  route.get("/", function () {
    return view("welcome", {
      app: config("app.name"),
    });
  });

  route.get("/test", ["example.controller", "sayHello"]);
};
