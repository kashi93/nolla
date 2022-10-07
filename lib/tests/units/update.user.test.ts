class UpdateUserTest {
  async handler() {
    const { default: userModel } = require("../../models/user.model");
    for (let i = 0; i < 100; i++) {
      await userModel.where("name", "=", i).update({
        name: `update_${i}`,
      });
    }
    return;
  }
}

exports.default = new UpdateUserTest();
