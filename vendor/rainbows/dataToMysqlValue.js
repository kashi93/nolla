"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataToMysqlValue = void 0;
var dateTime_1 = require("./dateTime");
var dataToMysqlValue = function (val) {
    if (val == null || val == undefined) {
        return "NULL";
    }
    if (typeof val == "string") {
        if ((0, dateTime_1.dateTime)(val) != null) {
            return "'".concat((0, dateTime_1.dateTime)(val), "'");
        }
        else {
            return "'".concat(val, "'");
        }
    }
    else if (typeof val == "bigint" || typeof val == "number") {
        return val;
    }
    else if (typeof val == "boolean") {
        return Number(val);
    }
    else if (typeof val == "object") {
        return "'".concat(JSON.stringify(val), "'");
    }
    else {
        return "'".concat(val, "'");
    }
};
exports.dataToMysqlValue = dataToMysqlValue;
