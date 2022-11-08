globalThis.storage_path = function (path) {
    var _a;
    if (path === void 0) { path = ""; }
    var _path = require("path");
    var p = require("".concat(_path.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), "/").concat(path));
    return p;
};
