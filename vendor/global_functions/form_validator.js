globalThis.errors = [];
globalThis.message = "";
globalThis.errorHas = function (field) {
    var err = global.errors.filter(function (e) { return e.param == field; });
    if (err.length > 0) {
        global.message = err[0].msg;
        return true;
    }
    return false;
};
globalThis.clearFormValidationSession = function () {
    setTimeout(function () {
        global.errors = [];
        global.message = "";
    }, 3000);
};
