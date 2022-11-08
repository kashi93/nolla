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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ReactUiRollbackCommand = /** @class */ (function () {
    function ReactUiRollbackCommand() {
    }
    ReactUiRollbackCommand.prototype.handle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.js()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.css()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.nodeModules()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.app()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.webpack()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.pack()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReactUiRollbackCommand.prototype.app = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var app, react_comment;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fs_1.default.promises.readFile("".concat(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), "/resources/js/app.js"), "utf-8")];
                    case 1:
                        app = _c.sent();
                        react_comment = new RegExp("import \"./react/index\";");
                        app = app.replace(react_comment, "// import \"./react/index\";");
                        return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(path_1.default.dirname((_b = require.main) === null || _b === void 0 ? void 0 : _b.filename), "/resources/js/app.js"), app, "utf-8")];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactUiRollbackCommand.prototype.nodeModules = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fs_1.default.existsSync("".concat(process.cwd(), "/node_modules"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1.default.promises.rm("".concat(process.cwd(), "/node_modules"), {
                                recursive: true,
                                force: true,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    ReactUiRollbackCommand.prototype.pack = function () {
        var e_1, _a, e_2, _b;
        return __awaiter(this, void 0, void 0, function () {
            var pack, defPack, _c, _d, key, _e, _f, key1, e_2_1, e_1_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        pack = require("../package").default;
                        defPack = require("".concat(process.cwd(), "/package.json"));
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 17, 18, 23]);
                        _c = __asyncValues(Object.getOwnPropertyNames(pack));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _c.next()];
                    case 3:
                        if (!(_d = _g.sent(), !_d.done)) return [3 /*break*/, 16];
                        key = _d.value;
                        _g.label = 4;
                    case 4:
                        _g.trys.push([4, 9, 10, 15]);
                        _e = (e_2 = void 0, __asyncValues(Object.getOwnPropertyNames(pack[key])));
                        _g.label = 5;
                    case 5: return [4 /*yield*/, _e.next()];
                    case 6:
                        if (!(_f = _g.sent(), !_f.done)) return [3 /*break*/, 8];
                        key1 = _f.value;
                        if (defPack[key][key1] != null) {
                            delete defPack[key][key1];
                        }
                        _g.label = 7;
                    case 7: return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _g.trys.push([10, , 13, 14]);
                        if (!(_f && !_f.done && (_b = _e.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _b.call(_e)];
                    case 11:
                        _g.sent();
                        _g.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [3 /*break*/, 2];
                    case 16: return [3 /*break*/, 23];
                    case 17:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 23];
                    case 18:
                        _g.trys.push([18, , 21, 22]);
                        if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 20];
                        return [4 /*yield*/, _a.call(_c)];
                    case 19:
                        _g.sent();
                        _g.label = 20;
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 22: return [7 /*endfinally*/];
                    case 23: return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(process.cwd(), "/package.json"), JSON.stringify(defPack, null, "\t"), "utf-8")];
                    case 24:
                        _g.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactUiRollbackCommand.prototype.webpack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var app;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.default.promises.readFile("".concat(process.cwd(), "/webpack.config.js"), "utf-8")];
                    case 1:
                        app = _a.sent();
                        app = app
                            .replace(/\/\/ module\.exports = webpack\.react\(\);/i, "module.exports = webpack.react();")
                            .replace(/module\.exports = webpack\.react\(\);/i, "// module.exports = webpack.react();");
                        return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(process.cwd(), "/webpack.config.js"), app, "utf-8")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactUiRollbackCommand.prototype.js = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!fs_1.default.existsSync("".concat(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), "/resources/js/react"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1.default.promises.rm("".concat(path_1.default.dirname((_b = require.main) === null || _b === void 0 ? void 0 : _b.filename), "/resources/js/react"), { recursive: true })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    ReactUiRollbackCommand.prototype.css = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!fs_1.default.existsSync("".concat(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), "/resources/css/react"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1.default.promises.rm("".concat(path_1.default.dirname((_b = require.main) === null || _b === void 0 ? void 0 : _b.filename), "/resources/css/react"), { recursive: true })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    return ReactUiRollbackCommand;
}());
exports.default = new ReactUiRollbackCommand();
