const Controller = require("../controller");

class RegisterController extends Controller {
  index() {
    return view("nolla/pages/register/register");
  }

  async create(req) {
    this.validate(req, {
      email: ["required", "email"],
    });
    return request;
  }
}

module.exports = RegisterController;
