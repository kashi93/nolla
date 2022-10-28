import { Express } from "express";
class AppDefaultService {
  boot(app: Express) {
    const cookieParser = require("cookie-parser");
    app.use(cookieParser());
  }
}

module.exports = AppDefaultService;
