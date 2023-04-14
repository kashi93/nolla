import Schema from "../vendor/database/mysql/schema";

class Migration {
  async up() {
    await Schema.create("users", (table) => {
      table.id();
      table.string("name");
      table.string("email").unique();
      table.timestamp("email_verified_at").nullable();
      table.string("password");
      table.timestamps();
    });
  }

  async down() {
    await Schema.dropIfExists("users");
  }
}

export = new Migration();
