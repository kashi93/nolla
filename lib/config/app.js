require("dotenv").config();
const env = process.env;

exports.default = {
  name: env.APP_NAME || "Nolla",
  timezone: env.TZ || "UTC",
};
