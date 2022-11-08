var Migration = /** @class */ (function () {
    function Migration() {
    }
    Migration.prototype.up = function () {
        var Table = require("../vendor/database/mysql/table").default;
        return {
            name: "{table_name}",
            columns: [Table.id(), Table.timestamps()],
        };
    };
    Migration.prototype.down = function () {
        return {
            name: "{table_name}",
        };
    };
    return Migration;
}());
module.exports.Migration = new Migration();
