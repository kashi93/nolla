import Schema from "nolla-core/src/database/mysql/schema";

class Migration {
  async up() {
    await Schema.create("users", (table) => {
      table.id();
      table.string("name");
      table.string("email", { unique: true })
      table.timestamp("email_verified_at", { nullable: true })
      table.string("password");
      table.timestamps();
    });
  }

  async down() {
    await Schema.dropIfExists("users");
  }
}

export default new Migration();
