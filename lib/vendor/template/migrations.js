class Migration {
  up() {
    const { default: Table } = require("../vendor/database/mysql/table");
    return {
      name: "{table_name}",
      columns: [Table.id(), Table.timestamps()],
    };
  }

  down() {
    return {
      name: "{table_name}",
    };
  }
}

module.exports.Migration = new Migration();
