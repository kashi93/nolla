import Schema from "../vendor/database/mysql/schema";

class Migration {
  async up() {
    await Schema.table("users", (table) => {
      table.decimal("name");
    });
  }

  async down() {
    //
  }
}

export = new Migration();
