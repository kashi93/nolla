export = {
  default: env("DB_CONNECTION") || "mysql",
  connections: {
    mysql: {
      host: env("DB_HOST") || "127.0.0.1",
      port: env("DB_PORT") || "3306",
      user: env("DB_USERNAME") || "",
      password: env("DB_PASSWORD") || "",
      database: env("DB_DATABASE") || "",
      timezone: env("TZ") || "UTC",
    },
  },
};
