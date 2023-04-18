import { default as Route } from "nolla-core/src/route/route";

Route.get("/", function () {
  return view("welcome");
});

