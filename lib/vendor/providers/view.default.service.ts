import { Express } from "express";
class ViewDefaultService {
  boot(app: Express) {
    const path = require("path");
    app.set("views", path.dirname(require.main?.filename) + "/resources/views");
    app.set("view engine", "ejs");
    // app.engine("js", require("express-react-views").createEngine());
  }
}

module.exports = ViewDefaultService;
