"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var Hash = /** @class */ (function () {
    function Hash() {
    }
    Hash.prototype.make = function (plainText) {
        return new Promise(function (res, rej) {
            bcrypt_1.default.genSalt(10, function (err, salt) {
                bcrypt_1.default.hash(plainText, salt, function (err, hash) {
                    res(hash);
                });
            });
        });
    };
    Hash.prototype.verify = function (plainText, hashText) {
        return new Promise(function (res, rej) {
            bcrypt_1.default.compare(plainText, hashText, function (err, result) {
                res(result);
            });
        });
    };
    return Hash;
}());
exports.default = new Hash();
