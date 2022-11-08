"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.params = void 0;
var col = "";
exports.params = [];
var PrivateMethod = /** @class */ (function () {
    function PrivateMethod() {
    }
    PrivateMethod.prototype.nullable = function () {
        var current_params = exports.params[exports.params.length - 1].replace(/NOT NULL/g, "");
        exports.params[exports.params.length - 1] = "".concat(current_params, " NULL");
    };
    PrivateMethod.prototype.unique = function () {
        var current_params = exports.params[exports.params.length - 1];
        exports.params[exports.params.length - 1] = "".concat(current_params, " UNIQUE");
    };
    return PrivateMethod;
}());
var Table = /** @class */ (function () {
    function Table() {
    }
    Table.prototype.id = function (column) {
        if (column === void 0) { column = "id"; }
        col = column;
        exports.params.push("".concat(col, " BIGINT NOT NULL AUTO_INCREMENT"));
        exports.params.push("PRIMARY KEY (".concat(col, ")"));
    };
    Table.prototype.bigInt = function (column) {
        col = column;
        exports.params.push("".concat(col, " BIGINT NOT NULL"));
        return new PrivateMethod();
    };
    Table.prototype.string = function (column, length) {
        if (length === void 0) { length = 255; }
        col = column;
        exports.params.push("".concat(col, " VARCHAR(").concat(length, ") NOT NULL"));
        return new PrivateMethod();
    };
    Table.prototype.timestamp = function (column) {
        col = column;
        exports.params.push("".concat(col, " TIMESTAMP NOT NULL"));
        return new PrivateMethod();
    };
    Table.prototype.timestamps = function () {
        exports.params.push("created_at TIMESTAMP NULL");
        exports.params.push("updated_at TIMESTAMP NULL");
    };
    Table.prototype.custom = function (statement) {
        exports.params.push(statement);
    };
    Table.prototype.resetParams = function () {
        exports.params = [];
    };
    return Table;
}());
exports.default = new Table();
