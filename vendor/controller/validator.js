"use strict";
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
var express_validator_1 = require("express-validator");
var mimesTypes_1 = require("./mimesTypes");
var validation = require("../../resources/views/lang/validation").default;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.prototype.validate = function (req, rule, sentBack) {
        if (sentBack === void 0) { sentBack = true; }
        return __awaiter(this, void 0, void 0, function () {
            var rules, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepare(rule, req)];
                    case 1:
                        rules = _a.sent();
                        return [4 /*yield*/, Promise.all(rules.map(function (validation) { return validation.run(req); }))];
                    case 2:
                        _a.sent();
                        err = (0, express_validator_1.validationResult)(req);
                        errors = err.array();
                        if (err.array().length > 0) {
                            if (sentBack) {
                                try {
                                    response.redirect("back");
                                    return [2 /*return*/, false];
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            }
                            else {
                                return [2 /*return*/, err.array()];
                            }
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Validator.prototype.prepare = function (rule, req) {
        var e_1, _a, e_2, _b;
        return __awaiter(this, void 0, void 0, function () {
            var rules, _c, _d, field, next, _e, _f, r, split, _g, e_2_1, e_1_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        rules = [];
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 28, 29, 34]);
                        _c = __asyncValues(Object.getOwnPropertyNames(rule));
                        _h.label = 2;
                    case 2: return [4 /*yield*/, _c.next()];
                    case 3:
                        if (!(_d = _h.sent(), !_d.done)) return [3 /*break*/, 27];
                        field = _d.value;
                        next = true;
                        _h.label = 4;
                    case 4:
                        _h.trys.push([4, 20, 21, 26]);
                        _e = (e_2 = void 0, __asyncValues(rule[field]));
                        _h.label = 5;
                    case 5: return [4 /*yield*/, _e.next()];
                    case 6:
                        if (!(_f = _h.sent(), !_f.done)) return [3 /*break*/, 19];
                        r = _f.value;
                        if (!(typeof r == "string")) return [3 /*break*/, 17];
                        split = r.split(":");
                        if (split[0].trim().length < 1) {
                            return [3 /*break*/, 18];
                        }
                        if (!next) {
                            return [3 /*break*/, 19];
                        }
                        _g = split[0];
                        switch (_g) {
                            case "required": return [3 /*break*/, 7];
                            case "min": return [3 /*break*/, 10];
                            case "confirmation": return [3 /*break*/, 11];
                            case "nullable": return [3 /*break*/, 12];
                            case "mimes": return [3 /*break*/, 13];
                            case "max": return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 15];
                    case 7:
                        if (!(req.file(field) == null)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.required(field, req)];
                    case 8:
                        (_h.sent()).isEmpty();
                        _h.label = 9;
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        rules.push(this.min(req, field, parseInt(split[1])));
                        return [3 /*break*/, 16];
                    case 11:
                        rules.push(this.confirmation(req, field, split[1]));
                        return [3 /*break*/, 16];
                    case 12:
                        next = this.nullable(field, req);
                        return [3 /*break*/, 16];
                    case 13:
                        rules.push(this.mimes(req, field, split[1]));
                        return [3 /*break*/, 16];
                    case 14:
                        rules.push(this.max(req, field, parseInt(split[1])));
                        return [3 /*break*/, 16];
                    case 15:
                        rules.push(this[split[0]](field));
                        return [3 /*break*/, 16];
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (typeof r == "function") {
                            rules.push(this.custom(req, field, r));
                        }
                        _h.label = 18;
                    case 18: return [3 /*break*/, 5];
                    case 19: return [3 /*break*/, 26];
                    case 20:
                        e_2_1 = _h.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 26];
                    case 21:
                        _h.trys.push([21, , 24, 25]);
                        if (!(_f && !_f.done && (_b = _e.return))) return [3 /*break*/, 23];
                        return [4 /*yield*/, _b.call(_e)];
                    case 22:
                        _h.sent();
                        _h.label = 23;
                    case 23: return [3 /*break*/, 25];
                    case 24:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 25: return [7 /*endfinally*/];
                    case 26: return [3 /*break*/, 2];
                    case 27: return [3 /*break*/, 34];
                    case 28:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 34];
                    case 29:
                        _h.trys.push([29, , 32, 33]);
                        if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 31];
                        return [4 /*yield*/, _a.call(_c)];
                    case 30:
                        _h.sent();
                        _h.label = 31;
                    case 31: return [3 /*break*/, 33];
                    case 32:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 33: return [7 /*endfinally*/];
                    case 34: return [2 /*return*/, rules];
                }
            });
        });
    };
    Validator.prototype.email = function (field) {
        var msg = "Invalid value";
        if (validation.email != null) {
            msg = validation.email.replace(/:attribute/, field.replace(/_/, " "));
        }
        return (0, express_validator_1.body)(field).isEmail().withMessage(msg).bail();
    };
    Validator.prototype.required = function (field, req) {
        var msg = "Invalid value";
        if (validation.required != null) {
            msg = validation.required.replace(/:attribute/, field.replace(/_/, " "));
        }
        return (0, express_validator_1.body)(field)
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage(msg)
            .run(req);
    };
    Validator.prototype.nullable = function (field, req) {
        if (req.body[field] == null) {
            return false;
        }
        if (String(req.body[field]).trim().length > 0) {
            return true;
        }
        return false;
    };
    Validator.prototype.min = function (req, field, size) {
        if (Number.isNaN(size)) {
            return (0, express_validator_1.body)(field).custom(function () { return true; });
        }
        var msg = "Invalid value";
        var v = validation.min;
        if (req.file(field) != null) {
            if (v.file != null) {
                msg = v.file
                    .replace(/:attribute/, field.replace(/_/, " "))
                    .replace(/:min/, size);
            }
            if (req.file(field) != null) {
                return (0, express_validator_1.body)(field).custom(function () {
                    var file = req.file(field);
                    if (file.size < size) {
                        return Promise.reject(msg);
                    }
                    return true;
                });
            }
        }
        else {
            if (v.string != null) {
                msg = v.string
                    .replace(/:attribute/, field.replace(/_/, " "))
                    .replace(/:min/, size);
            }
            return (0, express_validator_1.body)(field).isLength({ min: size }).withMessage(msg).bail();
        }
    };
    Validator.prototype.confirmation = function (req, field1, field2) {
        var msg = "Invalid value";
        if (validation.confirmation != null) {
            msg = validation.confirmation.replace(/:attribute/, field2.replace(/_/, " "));
        }
        return (0, express_validator_1.body)(field1).custom(function () {
            if (req.body[field1].trim() != req.body[field2].trim()) {
                return Promise.reject(msg);
            }
            return true;
        });
    };
    Validator.prototype.custom = function (req, field, func) {
        var _this = this;
        return (0, express_validator_1.body)(field).custom(function () { return __awaiter(_this, void 0, void 0, function () {
            var err, fail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fail = function (val) { return (err = val); };
                        return [4 /*yield*/, func(field, req.body[field], fail)];
                    case 1:
                        _a.sent();
                        if (err != null) {
                            return [2 /*return*/, Promise.reject(err)];
                        }
                        return [2 /*return*/, true];
                }
            });
        }); });
    };
    Validator.prototype.mimes = function (req, field, selectedMimes) {
        var _this = this;
        return (0, express_validator_1.body)(field).custom(function () { return __awaiter(_this, void 0, void 0, function () {
            var msg, file, mimetype, list, _a, _b, m, _c, _d, m2, e_3_1, e_4_1;
            var e_4, _e, e_3, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        msg = "Invalid value";
                        if (validation.confirmation != null) {
                            msg = validation.mimes
                                .replace(/:attribute/, field.replace(/_/, " "))
                                .replace(/:values/, selectedMimes);
                        }
                        if (!(req.file(field) != null)) return [3 /*break*/, 24];
                        file = req.file(field), mimetype = file.mimetype;
                        list = [];
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 17, 18, 23]);
                        _a = __asyncValues(selectedMimes.split(","));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _a.next()];
                    case 3:
                        if (!(_b = _g.sent(), !_b.done)) return [3 /*break*/, 16];
                        m = _b.value;
                        if (!(mimesTypes_1.mimesTypes[m] != null)) return [3 /*break*/, 15];
                        if (!!Array.isArray(mimesTypes_1.mimesTypes[m])) return [3 /*break*/, 4];
                        list.push(mimesTypes_1.mimesTypes[m]);
                        return [3 /*break*/, 15];
                    case 4:
                        _g.trys.push([4, 9, 10, 15]);
                        _c = (e_3 = void 0, __asyncValues(mimesTypes_1.mimesTypes[m]));
                        _g.label = 5;
                    case 5: return [4 /*yield*/, _c.next()];
                    case 6:
                        if (!(_d = _g.sent(), !_d.done)) return [3 /*break*/, 8];
                        m2 = _d.value;
                        list.push(m2);
                        _g.label = 7;
                    case 7: return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _g.trys.push([10, , 13, 14]);
                        if (!(_d && !_d.done && (_f = _c.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _f.call(_c)];
                    case 11:
                        _g.sent();
                        _g.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [3 /*break*/, 2];
                    case 16: return [3 /*break*/, 23];
                    case 17:
                        e_4_1 = _g.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 23];
                    case 18:
                        _g.trys.push([18, , 21, 22]);
                        if (!(_b && !_b.done && (_e = _a.return))) return [3 /*break*/, 20];
                        return [4 /*yield*/, _e.call(_a)];
                    case 19:
                        _g.sent();
                        _g.label = 20;
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 22: return [7 /*endfinally*/];
                    case 23:
                        if (!list.includes(mimetype)) {
                            return [2 /*return*/, Promise.reject(msg)];
                        }
                        _g.label = 24;
                    case 24: return [2 /*return*/, true];
                }
            });
        }); });
    };
    Validator.prototype.max = function (req, field, size) {
        if (Number.isNaN(size)) {
            return (0, express_validator_1.body)(field).custom(function () { return true; });
        }
        var msg = "Invalid value";
        var v = validation.max;
        if (v.file != null) {
            msg = v.file
                .replace(/:attribute/, field.replace(/_/, " "))
                .replace(/:max/, size);
        }
        if (req.file(field) != null) {
            return (0, express_validator_1.body)(field).custom(function () {
                var file = req.file(field);
                if (file.size > size) {
                    return Promise.reject(msg);
                }
                return true;
            });
        }
        else {
            if (v.string != null) {
                msg = v.string
                    .replace(/:attribute/, field.replace(/_/, " "))
                    .replace(/:max/, size);
            }
            return (0, express_validator_1.body)(field)
                .isLength({ min: 0, max: size })
                .withMessage(msg)
                .bail();
        }
    };
    return Validator;
}());
exports.default = Validator;
