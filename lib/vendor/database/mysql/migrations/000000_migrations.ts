import Schema from "../schema";

class Migration {
  async up() {
    await Schema.create("migrations", (table) => {
      table.id();
      table.string("migration");
    });
  }

  async down() {
    await Schema.dropIfExists("migrations");
  }
}

export = new Migration();
