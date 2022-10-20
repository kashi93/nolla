const Controller = require("../controller");

class RegisterController extends Controller {
  index() {
    return view("nolla/pages/register/register");
  }

  async create(req) {
    await this.validate(req, {
      email: ["required", "email"],
      password: ["required", "min:2"],
    });
    return request;
  }
}

module.exports = RegisterController;
