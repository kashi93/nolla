import { default as Model } from "../../vendor/database/mysql/model";

class UserModel extends Model {
  constructor() {
    super();
    this.table = "users";
    this.hidden = ["password"];
  }
}

export = new UserModel();
