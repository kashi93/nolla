const Controller = require("../controller");
const DefaultAuth = require("../../../vendor/rainbows/defaultAuth");
const { applyMixins } = require("../../../vendor/rainbows/applyMixins");

applyMixins(Controller, [DefaultAuth]);

class LoginController extends Controller {}
module.exports = LoginController;
