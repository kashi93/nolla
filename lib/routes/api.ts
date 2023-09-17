import { Route } from "nolla-core";

Route.get("test", function () {
    return {
        a: 1
    }
})