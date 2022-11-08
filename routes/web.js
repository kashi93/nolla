var Route = require("../vendor/route/route").default;

Route.get("/", function () {
  return view("welcome");
});
