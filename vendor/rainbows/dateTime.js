"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTime = void 0;
var dateTime = function (d) {
    if (d === void 0) { d = null; }
    var date;
    if (d != null) {
        if (typeof d != "string") {
            return null;
        }
        if (!Number.isNaN(Number(d))) {
            return null;
        }
        date = new Date(d);
    }
    else {
        date = new Date();
    }
    if (Object.prototype.toString.call(date) !== "[object Date]") {
        return null;
    }
    if (isNaN(date)) {
        return null;
    }
    date =
        date.getFullYear() +
            "-" +
            ("00" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("00" + date.getDate()).slice(-2) +
            " " +
            ("00" + date.getHours()).slice(-2) +
            ":" +
            ("00" + date.getMinutes()).slice(-2) +
            ":" +
            ("00" + date.getSeconds()).slice(-2);
    return date;
};
exports.dateTime = dateTime;
