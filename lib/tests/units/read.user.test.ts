import userModel from "../../models/user.model";

class ReadUserTest {
  async handler() {
    for (let i = 0; i < 100; i++) {
      console.log(await userModel.where("name", "=", i).first());
    }
    return;
  }
}

exports.default = new ReadUserTest();
