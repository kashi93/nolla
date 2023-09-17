"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web = /** @class */ (function () {
    function Web() {
    }
    Web.prototype.handle = function (req, res, next) {
        return next();
    };
    return Web;
}());
exports.default = Web;
