import { default as Model } from "nolla-core/src/database/mysql/model";

class UserModel extends Model {
  table = "users";
  hidden = ["password"]
}

export default new UserModel();
