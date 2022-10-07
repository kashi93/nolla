class Migration {
  up() {
    const { default: Table } = require("../vendor/database/mysql/table");
    return {
      name: "migrations",
      columns: [Table.id(), Table.string("migration")],
    };
  }

  down() {
    return {
      name: "migrations",
    };
  }
}

module.exports.Migration = new Migration();
