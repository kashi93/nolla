import userModel from "../../models/user.model";

class ViewUserTest {
  async handler() {
    for (let i = 0; i < 100; i++) {
      console.log(await userModel.where("name", "=", i).get());
    }
    return;
  }
}

exports.default = new ViewUserTest();
