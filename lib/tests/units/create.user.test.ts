const { default: userModel } = require("../../models/user.model");
import hash from "../../vendor/rainbows/hash";

class CreateUserTest {
  async handler() {
    for (let i = 0; i < 100; i++) {
      await userModel.create({
        name: i,
        email: `${i}@gmail.com`,
        password: await hash.make("password"),
      });
    }
    return;
  }
}

exports.default = new CreateUserTest();
