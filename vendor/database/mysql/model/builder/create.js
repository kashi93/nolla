"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataToMysqlValue_1 = require("../../../../rainbows/dataToMysqlValue");
var dateTime_1 = require("../../../../rainbows/dateTime");
var getMysqlTableColumn_1 = require("../../../../rainbows/getMysqlTableColumn");
var execute_1 = require("./execute");
var Create = /** @class */ (function () {
    function Create() {
        this.table = "";
        this.useTimeStamps = true;
        this.created_at = null;
        this.updated_at = null;
    }
    Create.prototype.create = function (params) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var columns, p, query, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, (0, getMysqlTableColumn_1.getMysqlTableColumn)(this.table)];
                    case 1:
                        columns = _b.sent();
                        return [4 /*yield*/, this.objToParam1(__assign(__assign({}, columns), params))];
                    case 2:
                        p = _b.sent();
                        return [4 /*yield*/, this.createTimeStamp(p)];
                    case 3:
                        p = _b.sent();
                        query = "INSERT INTO ".concat(this.table, " (").concat(p.columns.join(","), ") VALUES (").concat(p.data.join(","), ")");
                        _a = res;
                        return [4 /*yield*/, (0, execute_1.execute)(query)];
                    case 4:
                        _a.apply(void 0, [_b.sent()]);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        rej(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    Create.prototype.createTimeStamp = function (current_params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.useTimeStamps) {
                    if (this.created_at == null) {
                        current_params.columns.push("created_at");
                        current_params.data.push("'".concat((0, dateTime_1.dateTime)(), "'"));
                    }
                    else {
                        current_params.columns.push("created_at");
                        current_params.data.push(this.created_at);
                    }
                    if (this.updated_at == null) {
                        current_params.columns.push("updated_at");
                        current_params.data.push("'".concat((0, dateTime_1.dateTime)(), "'"));
                    }
                    else {
                        current_params.columns.push("updated_at");
                        current_params.data.push(this.updated_at);
                    }
                }
                return [2 /*return*/, current_params];
            });
        });
    };
    Create.prototype.objToParam1 = function (obj) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var columns, data, keys, keys_1, keys_1_1, key, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        columns = [];
                        data = [];
                        keys = Object.getOwnPropertyNames(obj);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 12]);
                        keys_1 = __asyncValues(keys);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, keys_1.next()];
                    case 3:
                        if (!(keys_1_1 = _b.sent(), !keys_1_1.done)) return [3 /*break*/, 5];
                        key = keys_1_1.value;
                        if (key == "created_at") {
                            this.created_at = "".concat((0, dataToMysqlValue_1.dataToMysqlValue)(obj[key]));
                        }
                        else if (key == "updated_at") {
                            this.updated_at = "".concat((0, dataToMysqlValue_1.dataToMysqlValue)(obj[key]));
                        }
                        else {
                            columns.push(key);
                            data.push("".concat((0, dataToMysqlValue_1.dataToMysqlValue)(obj[key])));
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _b.trys.push([7, , 10, 11]);
                        if (!(keys_1_1 && !keys_1_1.done && (_a = keys_1.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(keys_1)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, {
                            columns: columns,
                            data: data,
                        }];
                }
            });
        });
    };
    return Create;
}());
exports.default = Create;
