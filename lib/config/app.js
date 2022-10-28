require("dotenv").config();
const env = process.env;

exports.default = {
  name: env.APP_NAME || "Nolla",
  timezone: env.TZ || "UTC",
  app_url: env.APP_URL || "http://localhost",
  app_port: env.APP_PORT || 8000,
  app_key: env.APP_KEY || null,
  providers: [
    "vendor/providers/app.default.service",
    "vendor/providers/view.default.service",
    "app/services/route.service",
    "vendor/providers/route.default.service",
  ],
  alias: {
    auth: "vendor/rainbows/defaultAuth",
  },
};
