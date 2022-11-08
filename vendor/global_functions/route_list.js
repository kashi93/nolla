globalThis.routeList = [];
globalThis.route = function (name, params) {
    if (params === void 0) { params = {}; }
    var s = global.routeList.filter(function (r) { return r.name == name; });
    if (s.length < 1) {
        throw new Error("Route ".concat(name, " don't exist"));
    }
    var url = s[0].url;
    var split = url.split("/");
    for (var index = 0; index < split.length; index++) {
        var split2 = split[index].split(":");
        if (split2[1] != null) {
            if (params[split2[1]] == null) {
                throw new Error("Route ".concat(name, " parameter ").concat(split2[1], " is required"));
            }
            split[index] = params[split2[1]];
        }
    }
    url = split.join("/");
    return url;
};
