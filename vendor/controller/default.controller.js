"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("./validator"));
var DefaultController = /** @class */ (function () {
    function DefaultController() {
    }
    return DefaultController;
}());
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            if (name !== "constructor") {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
applyMixins(DefaultController, [validator_1.default]);
exports.default = DefaultController;
