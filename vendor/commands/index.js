"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
module.exports = (function () {
    yargs_1.default
        .command(require("./makeMigration"))
        .command(require("./makeMigrate"))
        .command(require("./makeModel"))
        .command(require("./generateUi"))
        .command(require("./makeServer"))
        .command(require("./makeTest"))
        .command(require("./compile_resources"))
        .showHelpOnFail(true)
        .help("help", "Show usage instructions.")
        .command({
        command: "*",
        handler: function () {
            yargs_1.default.showHelp();
        },
    })
        .demandCommand().argv;
})();
