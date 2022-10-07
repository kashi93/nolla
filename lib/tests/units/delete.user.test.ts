class DeleteUserTest {
  async handler() {
    const { default: userModel } = require("../../models/user.model");
    for (let i = 0; i < 100; i++) {
      await userModel.where("name", "=", `update_${i}`).delete();
    }
    return;
  }
}

exports.default = new DeleteUserTest();
