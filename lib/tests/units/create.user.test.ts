import hash from "../../vendor/rainbows/hash";

class CreateUserTest {
  async handler() {
    const { default: userModel } = require("../../app/models/user.model");
    for (let i = 0; i < 1000; i++) {
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
