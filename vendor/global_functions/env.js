globalThis.env = function (con) {
    try {
        require("dotenv").config();
        var env_1 = process.env;
        return env_1[con];
    }
    catch (error) {
        return null;
    }
};
