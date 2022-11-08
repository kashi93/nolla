"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMixins = void 0;
var applyMixins = function (baseClass, extendedClasses) {
    extendedClasses.forEach(function (extendedClass) {
        Object.getOwnPropertyNames(extendedClass.prototype).forEach(function (name) {
            Object.defineProperty(baseClass.prototype, name, Object.getOwnPropertyDescriptor(extendedClass.prototype, name) ||
                Object.create(null));
        });
    });
};
exports.applyMixins = applyMixins;
