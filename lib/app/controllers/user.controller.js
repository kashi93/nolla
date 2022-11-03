const { default: hash } = require("../../vendor/rainbows/hash");
const { default: userModel } = require("../models/user.model");
const Controller = require("./controller");

class UserController extends Controller {
  async index() {
    const users = await userModel.all();

    return users;
  }

  create() {
    return view("nolla/pages/user/user_create_form", {
      layout: "nolla/templates/app",
    });
  }

  async store(req) {
    const validate = await this.validate(req, {
      name: ["required"],
      email: [
        "required",
        "email",
        async function (attr, val, fail) {
          if (
            (await userModel
              .where("email", "=", request.input("email"))
              .first()) != null
          ) {
            fail("The email has already been taken.");
          }
        },
      ],
      password: ["required", "min:5", "max:8"],
      password_confirmation: ["required", "confirmation:password"],
      test: ["required", "mimes:jpeg,svg", "min:528"],
    });

    if (validate) {
      await userModel.create({
        name: request.input("name"),
        email: request.input("email"),
        password: await hash.make(request.input("password")),
      });
      return response.redirect(route("user.index"));
    }
  }

  async edit(id) {
    const user = await userModel.where("id", "=", id).first();
    return view("nolla/pages/user/user_edit_form", {
      layout: "nolla/templates/app",
      user: user,
    });
  }

  async update(id, req) {
    const validate = await this.validate(req, {
      name: ["required"],
      email: [
        "required",
        "email",
        async function (attr, val, fail) {
          if (
            (await userModel
              .where("email", "=", request.input("email"))
              .where("id", "!=", id)
              .first()) != null
          ) {
            fail("The email has already been taken.");
          }
        },
      ],
      password: ["nullable", "min:5"],
      password_confirmation: ["nullable", "confirmation:password"],
    });

    if (validate) {
      const data = {
        name: request.input("name"),
        email: request.input("email"),
      };

      if (request.input("password") != null) {
        data.password = await hash.make(request.input("password"));
      }

      await userModel.where("id", "=", id).update(data);

      return response.redirect(route("user.index"));
    }
  }
}

module.exports = UserController;
