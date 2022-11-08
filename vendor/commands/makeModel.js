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
var yargs_1 = __importDefault(require("yargs"));
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
exports.default = yargs_1.default.command({
    command: "create:model",
    describe: "Create a new model class",
    builder: {
        class: {
            alias: "c",
            required: true,
            type: "string",
            describe: "name of model",
        },
        table_name: {
            alias: "tn",
            required: true,
            type: "string",
            describe: "name of database table",
        },
    },
    handler: function (argv) {
        var e_1, _a;
        var _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var path, p, m, models, models_1, models_1_1, model, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        path = require("path");
                        p = "".concat(path.dirname((_b = require.main) === null || _b === void 0 ? void 0 : _b.filename), "/models/");
                        m = null;
                        if (!Number.isNaN(parseInt(String(argv.class))) ||
                            !Number.isNaN(parseInt(String(argv.table_name)))) {
                            console.log(chalk_1.default.red("Invalid name!"));
                            return [2 /*return*/];
                        }
                        if (argv.class == "model" || argv.table_name == "model") {
                            console.log(chalk_1.default.red("Invalid name!"));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fs_1.default.promises.readdir(p)];
                    case 1:
                        models = _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        models_1 = __asyncValues(models);
                        _d.label = 3;
                    case 3: return [4 /*yield*/, models_1.next()];
                    case 4:
                        if (!(models_1_1 = _d.sent(), !models_1_1.done)) return [3 /*break*/, 6];
                        model = models_1_1.value;
                        if ("".concat(String(argv.class).toLowerCase(), ".model.js") == model) {
                            console.log(chalk_1.default.red("Model ".concat(argv.class, " already exist!")));
                            return [2 /*return*/];
                        }
                        _d.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(models_1_1 && !models_1_1.done && (_a = models_1.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(models_1)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13:
                        if (!(argv.class != "" && argv.table_name != "")) return [3 /*break*/, 15];
                        return [4 /*yield*/, fs_1.default.promises
                                .readFile("".concat(path.dirname((_c = require.main) === null || _c === void 0 ? void 0 : _c.filename), "/vendor/template/model.template.js"), "utf-8")
                                .then(function (t) {
                                return t
                                    .replace(/{table_name}/g, "".concat(argv.table_name))
                                    .replace(/ModelTemplate/g, "".concat(argv.class));
                            })];
                    case 14:
                        m = _d.sent();
                        _d.label = 15;
                    case 15:
                        if (!(m != null)) return [3 /*break*/, 17];
                        return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(p).concat(String(argv.class).toLowerCase(), ".model.js"), m, "utf-8")];
                    case 16:
                        _d.sent();
                        console.log(chalk_1.default.green("Created Model: ".concat(String(argv.class).toLowerCase(), ".model.js")));
                        _d.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    },
});
