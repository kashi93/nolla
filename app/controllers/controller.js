var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DefaultController = require("../../vendor/controller/default.controller").default;
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Controller.prototype.applyMixins = function (baseClass, extendedClasses) {
        extendedClasses.forEach(function (extendedClass) {
            Object.getOwnPropertyNames(extendedClass.prototype).forEach(function (name) {
                Object.defineProperty(baseClass.prototype, name, Object.getOwnPropertyDescriptor(extendedClass.prototype, name) ||
                    Object.create(null));
            });
        });
    };
    return Controller;
}(DefaultController));
module.exports = Controller;
