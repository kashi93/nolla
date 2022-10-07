import userModel from "../../models/user.model";

class UpdateUserTest {
  async handler() {
    for (let i = 0; i < 100; i++) {
      await userModel.where("name", "=", i).update({
        name: `update_${i}`,
      });
    }
    return;
  }
}

exports.default = new UpdateUserTest();
