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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var controller_1 = require("../template/controller");
var fs_1 = __importDefault(require("fs"));
exports.default = yargs_1.default.command({
    command: "make:controller",
    describe: "Create a new controller class",
    builder: {
        name: {
            alias: "n",
            describe: "Name of controller",
            demandOption: true,
            type: "string",
        },
        resource: {
            alias: "r",
            demandOption: false,
            describe: "Generate controller with resources app method",
            type: "boolean",
            default: false,
        },
    },
    handler: function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var p, dir, n, c, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = "app/controllers/";
                        dir = String(argv.name).split("/");
                        n = dir.pop();
                        c = null;
                        if (!Number.isNaN(parseInt(String(argv.name)))) {
                            console.log("Controller name invalid!");
                            return [2 /*return*/];
                        }
                        if (!(dir.length > 0)) return [3 /*break*/, 5];
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < dir.length)) return [3 /*break*/, 5];
                        p += dir[index];
                        if (!!fs_1.default.existsSync(p)) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs_1.default.promises.mkdir(p)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        p += "/";
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (fs_1.default.existsSync("".concat(p).concat(n, ".ts"))) {
                            console.log("Controller already exists!");
                            return [2 /*return*/];
                        }
                        if (argv.resource) {
                            c = (0, controller_1.resourceController)(String(argv.name));
                        }
                        else {
                            c = (0, controller_1.plainController)(String(argv.name));
                        }
                        if (!(c != null)) return [3 /*break*/, 7];
                        return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(p).concat(n, ".ts"), c, "utf-8")];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        console.log("Controller successfully created");
                        return [2 /*return*/];
                }
            });
        });
    },
});
