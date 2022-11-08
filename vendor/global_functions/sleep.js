globalThis.sleep = function (ms) {
    return new Promise(function (res, rej) {
        setTimeout(function () {
            res(true);
        }, ms);
    });
};
