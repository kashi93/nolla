import userModel from "../../models/user.model";

class DeleteUserTest {
  async handler() {
    for (let i = 0; i < 100; i++) {
      await userModel.where("name", "=", `update_${i}`).delete();
    }
    return;
  }
}

exports.default = new DeleteUserTest();
