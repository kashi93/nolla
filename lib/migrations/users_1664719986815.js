class Migration {
  up() {
    const { default: Table } = require("../vendor/database/mysql/table");
    return {
      name: "users",
      columns: [
        Table.id(),
        Table.string("name"),
        Table.string("email").unique(),
        Table.timestamp("email_verified_at").nullable(),
        Table.string("password"),
        Table.timestamps(),
      ],
    };
  }

  down() {
    return {
      name: "users",
    };
  }
}

module.exports.Migration = new Migration();
