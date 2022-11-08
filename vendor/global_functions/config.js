globalThis.config = function (con) {
    var _a;
    var params = con.split(".");
    var path = require("path");
    var c = require("".concat(path.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), "/config/").concat(params[0])).default;
    if (params.length == 1) {
        return c;
    }
    for (var index = 1; index < params.length; index++) {
        if (c[params[index]] != undefined) {
            return c[params[index]];
        }
    }
    return null;
};
