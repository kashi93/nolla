"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = __importDefault(require("./builder/fetch"));
var create_1 = __importDefault(require("./builder/create"));
var Model = /** @class */ (function () {
    function Model() {
        this.useTimeStamps = true;
        this.hidden = [];
    }
    return Model;
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
applyMixins(Model, [create_1.default, fetch_1.default]);
exports.default = Model;
