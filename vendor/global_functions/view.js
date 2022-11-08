globalThis.view = function (path, data) {
    if (data === void 0) { data = {}; }
    return function () {
        return {
            view: path,
            data: data,
        };
    };
};
