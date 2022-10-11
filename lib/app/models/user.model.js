const { default: Model } = require("../../vendor/database/mysql/model");

class UserModel extends Model {
  constructor() {
    super();
    this.table = "users";
  }
}

exports.default = new UserModel();
