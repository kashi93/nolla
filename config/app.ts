export default {
  name: env("APP_NAME") || "Nolla",
  timezone: env("TZ") || "UTC",
  app_url: env("APP_URL") || "http://127.0.0.1",
  app_port: env("APP_PORT") || 8000,
  app_key: env("APP_KEY") || null,
  providers: [
    "node_modules/nolla-core/src/providers/app.default.service",
    "node_modules/nolla-core/src/providers/view.default.service",
    "node_modules/nolla-core/src/providers/route.default.service",
    "node_modules/nolla-core/src/providers/route.service",
  ],
  alias: {},
  routeMiddleware: {},
};
