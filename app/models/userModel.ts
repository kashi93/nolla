import { default as Model } from "nolla-core/src/database/mysql/model";

class userModel extends Model {
  private table = "users";
  private hidden = ["password"]

  id:number;
}

export default new userModel();
