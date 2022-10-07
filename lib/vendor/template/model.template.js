const { default: Model } = require("../vendor/database/mysql/model");

class ModelTemplate extends Model {
  constructor() {
    super();
    this.table = "{table_name}";
  }
}

exports.default = new ModelTemplate();
