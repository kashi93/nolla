var Migration = /** @class */ (function () {
    function Migration() {
    }
    Migration.prototype.up = function () {
        var Table = require("../vendor/database/mysql/table").default;
        return {
            name: "migrations",
            columns: [Table.id(), Table.string("migration")],
        };
    };
    Migration.prototype.down = function () {
        return {
            name: "migrations",
        };
    };
    return Migration;
}());
module.exports.Migration = new Migration();
