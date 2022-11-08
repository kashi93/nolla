const { default: Route } = require("../vendor/route/route");

Route.get("/", function () {
  return view("welcome");
});
