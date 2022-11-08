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
var userModel = require("../../app/models/user.model").default;
var validator_1 = __importDefault(require("../controller/validator"));
var hash_1 = __importDefault(require("./hash"));
var jwt = require("jsonwebtoken");
var DefaultAuth = /** @class */ (function () {
    function DefaultAuth() {
    }
    DefaultAuth.prototype.index = function () {
        return view("nolla/pages/login/login");
    };
    DefaultAuth.prototype.login = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validation(req)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.attempt()];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            this.generateSession(user);
                            return [2 /*return*/, response.redirect(this.redirectTo())];
                        }
                        else {
                            return [2 /*return*/, response.redirect(route("login"))];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DefaultAuth.prototype.validation = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        v = new validator_1.default();
                        return [4 /*yield*/, v.validate(req, {
                                email: ["required", "email"],
                                password: ["required"],
                            })];
                    case 1: return [2 /*return*/, ((_a.sent()) == true)];
                }
            });
        });
    };
    DefaultAuth.prototype.attempt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel
                            .where("email", "=", request.input("email"))
                            .first()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, hash_1.default.verify(request.input("password"), user.password || "")];
                    case 2:
                        if (!(_a.sent())) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    DefaultAuth.prototype.generateSession = function (user) {
        var token = jwt.sign({ user: user }, process.env.APP_KEY, {
            expiresIn: "1h",
        });
        response.cookie("jwt", token, {
            maxAge: 1 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
        });
    };
    DefaultAuth.prototype.redirectTo = function () {
        return route("home");
    };
    DefaultAuth.prototype.user = function () {
        if (request.cookies.jwt == null) {
            return null;
        }
        var decoded = jwt.verify(request.cookies.jwt || null, process.env.APP_KEY);
        return decoded.user;
    };
    DefaultAuth.prototype.logout = function () {
        response.cookie("jwt", "", {
            maxAge: -1,
            secure: true,
            httpOnly: true,
        });
        return response.redirect(route("login"));
    };
    return DefaultAuth;
}());
module.exports = DefaultAuth;
