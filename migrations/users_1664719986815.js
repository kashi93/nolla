var Migration = /** @class */ (function () {
  function Migration() {}
  Migration.prototype.up = function () {
    var Table = require("../vendor/database/mysql/table").default;
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
  };
  Migration.prototype.down = function () {
    return {
      name: "users",
    };
  };
  return Migration;
})();
module.exports.Migration = new Migration();
