import { default as Route } from "../vendor/route/route";

Route.get("/", function () {
  return view("welcome");
});
