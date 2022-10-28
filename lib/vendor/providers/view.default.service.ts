import { Express } from "express";
class ViewDefaultService {
  boot(app: Express) {
    const path = require("path");
    const expressLayouts = require("express-ejs-layouts");
    app.set("views", path.dirname(require.main?.filename) + "/resources/views");
    app.set("view engine", "ejs");
    app.use(expressLayouts);
  }
}

module.exports = ViewDefaultService;
