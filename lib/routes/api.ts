import { Route } from "nolla-core";
import exampleController from "../app/controllers/example.controller";

Route.post("test", [exampleController, "index"])