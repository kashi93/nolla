"use strict";
var storeError_1 = require("./storeError");
module.exports = process.on("uncaughtException", function (error) { return (0, storeError_1.storeError)(error); });
