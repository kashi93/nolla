class ViewUserTest {
  async handler() {
    const { default: userModel } = require("../../models/user.model");
    for (let i = 0; i < 100; i++) {
      console.log(await userModel.where("name", "=", i).get());
    }
    return;
  }
}

exports.default = new ViewUserTest();
