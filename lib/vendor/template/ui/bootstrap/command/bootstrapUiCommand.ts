import fs from "fs";
import path from "path";

class BootstrapUiCommand {
  async handle() {
    await this.app();
    await this.scss();
    await this.webpack();
    await this.pack();
    return;
  }

  async app() {
    let app = await fs.promises.readFile(
      `${path.dirname(require.main?.filename)}/resources/js/app.js`,
      "utf-8"
    );
    app = app
      .replace(
        new RegExp(`// import "../css/app.scss";`),
        `import "../css/app.scss";`
      )
      .replace(
        new RegExp(`// import jquery from "jquery";`),
        `import jquery from "jquery";`
      )
      .replace(new RegExp(`// import "bootstrap";`), `import "bootstrap";`)
      .replace(
        new RegExp(`// window.jquery = jquery;`),
        `window.jquery = jquery;`
      );

    await fs.promises.writeFile(
      `${path.dirname(require.main?.filename)}/resources/js/app.js`,
      app,
      "utf-8"
    );
  }

  async scss() {
    let app = await fs.promises.readFile(
      `${path.dirname(require.main?.filename)}/resources/css/app.scss`,
      "utf-8"
    );
    app = app.replace(
      new RegExp(`// @import "node_modules/bootstrap/scss/bootstrap";`),
      `@import "node_modules/bootstrap/scss/bootstrap";`
    );

    await fs.promises.writeFile(
      `${path.dirname(require.main?.filename)}/resources/css/app.scss`,
      app,
      "utf-8"
    );
  }

  async pack() {
    const { default: pack } = require("../package");
    const defPack = require(`${process.cwd()}/package.json`);
    for await (const key of Object.getOwnPropertyNames(pack)) {
      defPack[key] = {
        ...defPack[key],
        ...pack[key],
      };
    }
    await fs.promises.writeFile(
      `${process.cwd()}/package.json`,
      JSON.stringify(defPack, null, "\t"),
      "utf-8"
    );
  }

  async webpack() {
    let app = await fs.promises.readFile(
      `${process.cwd()}/webpack.config.js`,
      "utf-8"
    );
    app = app.replace(
      /\/\/ module\.exports = webpack\.bootstrap\(\);/i,
      `module.exports = webpack.bootstrap();`
    );
    await fs.promises.writeFile(
      `${process.cwd()}/webpack.config.js`,
      app,
      "utf-8"
    );
  }
}

export default new BootstrapUiCommand();
