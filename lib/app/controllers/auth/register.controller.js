const { default: hash } = require("../../../vendor/rainbows/hash");
const { default: userModel } = require("../../models/user.model");
const Controller = require("../controller");

class RegisterController extends Controller {
  index() {
    return view("nolla/pages/register/register");
  }

  async create(req) {
    if (await this.validation(req)) {
      await this.storeUser();
      return response.redirect(route("home"));
    }
  }

  async validation(req) {
    return (
      (await this.validate(req, {
        name: ["required"],
        email: [
          "required",
          "email",
          async function (attr, val, fail) {
            if (
              (await userModel.where("email", "=", request.email).first()) !=
              null
            ) {
              fail("The email has already been taken.");
            }
          },
        ],
        password: ["required", "min:5"],
        password_confirmation: ["required", "confirmation:password"],
      })) == true
    );
  }

  async storeUser() {
    return await userModel.create({
      name: request.name,
      email: request.email,
      password: await hash.make(request.password),
    });
  }
}

module.exports = RegisterController;
