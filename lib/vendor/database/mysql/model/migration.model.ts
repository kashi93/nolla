import Model from ".";

class MigrationModel extends Model {
  constructor() {
    super();
    this.table = "migrations";
    this.useTimeStamps = false;
  }
}

export default new MigrationModel();
