const { default: Model } = require("../../vendor/database/mysql/model");

class UserModel extends Model {
  constructor() {
    super();
    this.table = "users";
    this.hidden = ["password"];
  }
}

exports.default = new UserModel();
