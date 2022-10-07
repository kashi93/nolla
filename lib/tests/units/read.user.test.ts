class ReadUserTest {
  async handler() {
    const { default: userModel } = require("../../models/user.model");
    for (let i = 0; i < 100; i++) {
      console.log(await userModel.where("name", "=", i).first());
    }
    return;
  }
}

exports.default = new ReadUserTest();
