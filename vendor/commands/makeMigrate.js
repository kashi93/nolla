"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var yargs_1 = __importDefault(require("yargs"));
var fs_1 = __importDefault(require("fs"));
var table_1 = __importStar(require("../database/mysql/table"));
var checkMysqlTableExist_1 = require("../rainbows/checkMysqlTableExist");
var migration_model_1 = __importDefault(require("../database/mysql/model/migration.model"));
var chalk_1 = __importDefault(require("chalk"));
exports.default = yargs_1.default.command({
    command: "migrate",
    describe: "Run the database migrations",
    builder: {
        rollback: {
            alias: "r",
            required: false,
            type: "boolean",
            default: false,
        },
    },
    handler: function (argv) {
        var e_1, _a;
        var _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var path, mysql, Migration, m2, p, migrations, migrations_1, migrations_1_1, migrate, mysql, Migration, m2, m2, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(config("database.default") == "mysql")) return [3 /*break*/, 25];
                        path = require("path");
                        return [4 /*yield*/, (0, checkMysqlTableExist_1.checkMysqlTableExist)("migrations")];
                    case 1:
                        if (!!(_d.sent())) return [3 /*break*/, 4];
                        mysql = require("../database/mysql/connection").default;
                        Migration = require("".concat(path.dirname((_b = require.main) === null || _b === void 0 ? void 0 : _b.filename), "/migrations/migrations_1664719972281")).Migration;
                        m2 = Migration.up();
                        return [4 /*yield*/, new mysql().query("CREATE TABLE ".concat(m2.name, " (").concat(table_1.params.join(","), ")"))];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, migration_model_1.default.create({
                                migration: "migrations_1664719972281.js",
                            })];
                    case 3:
                        _d.sent();
                        table_1.default.resetParams();
                        _d.label = 4;
                    case 4:
                        p = "".concat(path.dirname((_c = require.main) === null || _c === void 0 ? void 0 : _c.filename), "/migrations/");
                        return [4 /*yield*/, fs_1.default.promises.readdir(p)];
                    case 5:
                        migrations = _d.sent();
                        _d.label = 6;
                    case 6:
                        _d.trys.push([6, 18, 19, 24]);
                        migrations_1 = __asyncValues(migrations);
                        _d.label = 7;
                    case 7: return [4 /*yield*/, migrations_1.next()];
                    case 8:
                        if (!(migrations_1_1 = _d.sent(), !migrations_1_1.done)) return [3 /*break*/, 17];
                        migrate = migrations_1_1.value;
                        mysql = require("../database/mysql/connection").default;
                        Migration = require("".concat(p, "/").concat(migrate)).Migration;
                        if (!!argv.rollback) return [3 /*break*/, 13];
                        m2 = Migration.up();
                        if (!(m2.name != "migrations")) return [3 /*break*/, 12];
                        return [4 /*yield*/, migration_model_1.default.where("migration", "=", migrate).first()];
                    case 9:
                        if (!((_d.sent()) ==
                            null)) return [3 /*break*/, 12];
                        return [4 /*yield*/, new mysql().query("CREATE TABLE ".concat(m2.name, " (").concat(table_1.params.join(","), ")"))];
                    case 10:
                        _d.sent();
                        return [4 /*yield*/, migration_model_1.default.create({
                                migration: migrate,
                            })];
                    case 11:
                        _d.sent();
                        _d.label = 12;
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        m2 = Migration.down();
                        return [4 /*yield*/, new mysql().query("DROP TABLE ".concat(m2.name))];
                    case 14:
                        _d.sent();
                        _d.label = 15;
                    case 15:
                        table_1.default.resetParams();
                        _d.label = 16;
                    case 16: return [3 /*break*/, 7];
                    case 17: return [3 /*break*/, 24];
                    case 18:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 24];
                    case 19:
                        _d.trys.push([19, , 22, 23]);
                        if (!(migrations_1_1 && !migrations_1_1.done && (_a = migrations_1.return))) return [3 /*break*/, 21];
                        return [4 /*yield*/, _a.call(migrations_1)];
                    case 20:
                        _d.sent();
                        _d.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 23: return [7 /*endfinally*/];
                    case 24:
                        console.log(chalk_1.default.green("Migrations successfully"));
                        _d.label = 25;
                    case 25: return [2 /*return*/];
                }
            });
        });
    },
});
