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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ReactUiCommand = /** @class */ (function () {
    function ReactUiCommand() {
    }
    ReactUiCommand.prototype.handle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.js()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.css()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.app()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.webpack()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.pack()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactUiCommand.prototype.app = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var app, react_comment;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fs_1.default.promises.readFile("".concat(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), "/resources/js/app.js"), "utf-8")];
                    case 1:
                        app = _c.sent();
                        react_comment = new RegExp("// import \"./react/index\";");
                        app = app.replace(react_comment, "import \"./react/index\";");
                        return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(path_1.default.dirname((_b = require.main) === null || _b === void 0 ? void 0 : _b.filename), "/resources/js/app.js"), app, "utf-8")];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactUiCommand.prototype.pack = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var pack, defPack, _b, _c, key, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        pack = require("../package").default;
                        defPack = require("".concat(process.cwd(), "/package.json"));
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(Object.getOwnPropertyNames(pack));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        key = _c.value;
                        defPack[key] = __assign(__assign({}, defPack[key]), pack[key]);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(process.cwd(), "/package.json"), JSON.stringify(defPack, null, "\t"), "utf-8")];
                    case 13:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactUiCommand.prototype.webpack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var app;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.default.promises.readFile("".concat(process.cwd(), "/webpack.config.js"), "utf-8")];
                    case 1:
                        app = _a.sent();
                        app = app
                            .replace(/\/\/ module\.exports = webpack\.react\(\);/i, "module.exports = webpack.react();")
                            .replace(/\/\/ module\.exports = webpack\.bootstrap\(\);/i, "module.exports = webpack.bootstrap();")
                            .replace(/module\.exports = webpack\.bootstrap\(\);/i, "// module.exports = webpack.bootstrap();");
                        return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(process.cwd(), "/webpack.config.js"), app, "utf-8")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactUiCommand.prototype.css = function () {
        var e_2, _a;
        var _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var csFiles, csFiles_1, csFiles_1_1, css, e_2_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!!fs_1.default.existsSync("".concat(path_1.default.dirname((_b = require.main) === null || _b === void 0 ? void 0 : _b.filename), "/resources/css/react"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1.default.promises.mkdir("".concat(path_1.default.dirname((_c = require.main) === null || _c === void 0 ? void 0 : _c.filename), "/resources/css/react"))];
                    case 1:
                        _g.sent();
                        _g.label = 2;
                    case 2: return [4 /*yield*/, fs_1.default.promises.readdir("".concat(path_1.default.dirname((_d = require.main) === null || _d === void 0 ? void 0 : _d.filename), "/vendor/template/ui/react/css"))];
                    case 3:
                        csFiles = _g.sent();
                        _g.label = 4;
                    case 4:
                        _g.trys.push([4, 10, 11, 16]);
                        csFiles_1 = __asyncValues(csFiles);
                        _g.label = 5;
                    case 5: return [4 /*yield*/, csFiles_1.next()];
                    case 6:
                        if (!(csFiles_1_1 = _g.sent(), !csFiles_1_1.done)) return [3 /*break*/, 9];
                        css = csFiles_1_1.value;
                        return [4 /*yield*/, fs_1.default.promises.copyFile("".concat(path_1.default.dirname((_e = require.main) === null || _e === void 0 ? void 0 : _e.filename), "/vendor/template/ui/react/css/").concat(css), "".concat(path_1.default.dirname((_f = require.main) === null || _f === void 0 ? void 0 : _f.filename), "/resources/css/react/").concat(css))];
                    case 7:
                        _g.sent();
                        _g.label = 8;
                    case 8: return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _g.trys.push([11, , 14, 15]);
                        if (!(csFiles_1_1 && !csFiles_1_1.done && (_a = csFiles_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _a.call(csFiles_1)];
                    case 12:
                        _g.sent();
                        _g.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    ReactUiCommand.prototype.js = function () {
        var e_3, _a;
        var _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var jsFiles, jsFiles_1, jsFiles_1_1, js, e_3_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!!fs_1.default.existsSync("".concat(path_1.default.dirname((_b = require.main) === null || _b === void 0 ? void 0 : _b.filename), "/resources/js/react"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1.default.promises.mkdir("".concat(path_1.default.dirname((_c = require.main) === null || _c === void 0 ? void 0 : _c.filename), "/resources/js/react"))];
                    case 1:
                        _g.sent();
                        _g.label = 2;
                    case 2: return [4 /*yield*/, fs_1.default.promises.readdir("".concat(path_1.default.dirname((_d = require.main) === null || _d === void 0 ? void 0 : _d.filename), "/vendor/template/ui/react/js"))];
                    case 3:
                        jsFiles = _g.sent();
                        _g.label = 4;
                    case 4:
                        _g.trys.push([4, 10, 11, 16]);
                        jsFiles_1 = __asyncValues(jsFiles);
                        _g.label = 5;
                    case 5: return [4 /*yield*/, jsFiles_1.next()];
                    case 6:
                        if (!(jsFiles_1_1 = _g.sent(), !jsFiles_1_1.done)) return [3 /*break*/, 9];
                        js = jsFiles_1_1.value;
                        return [4 /*yield*/, fs_1.default.promises.copyFile("".concat(path_1.default.dirname((_e = require.main) === null || _e === void 0 ? void 0 : _e.filename), "/vendor/template/ui/react/js/").concat(js), "".concat(path_1.default.dirname((_f = require.main) === null || _f === void 0 ? void 0 : _f.filename), "/resources/js/react/").concat(js.replace(/.txt/, "")))];
                    case 7:
                        _g.sent();
                        _g.label = 8;
                    case 8: return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _g.trys.push([11, , 14, 15]);
                        if (!(jsFiles_1_1 && !jsFiles_1_1.done && (_a = jsFiles_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _a.call(jsFiles_1)];
                    case 12:
                        _g.sent();
                        _g.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    return ReactUiCommand;
}());
exports.default = new ReactUiCommand();
