"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nolla_core_1 = require("nolla-core");
nolla_core_1.Route.get("test", function () {
    return {
        a: 1
    };
});
