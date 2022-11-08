globalThis.public_path = function (path) {
    if (path === void 0) { path = ""; }
    return "".concat(process.cwd(), "/public/").concat(path);
};
