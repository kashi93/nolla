import fs from "fs";
import path from "path";

class ReactUiRollbackCommand {
  async handle() {
    if (await this.js()) {
      await this.css();
      await this.nodeModules();
      await this.app();
      await this.webpack();
      await this.pack();
    }

    return;
  }

  async app() {
    let app = await fs.promises.readFile(
      `${path.dirname(require.main?.filename)}/resources/js/app.js`,
      "utf-8"
    );
    const react_comment = new RegExp(`import "./react/index";`);
    app = app.replace(react_comment, `// import "./react/index";`);
    await fs.promises.writeFile(
      `${path.dirname(require.main?.filename)}/resources/js/app.js`,
      app,
      "utf-8"
    );
  }

  async nodeModules() {
    if (fs.existsSync(`${process.cwd()}/node_modules`)) {
      await fs.promises.rm(`${process.cwd()}/node_modules`, {
        recursive: true,
        force: true,
      });
      return true;
    }
    return false;
  }

  async pack() {
    const { default: pack } = require("../package");
    const defPack = require(`${process.cwd()}/package.json`);
    for await (const key of Object.getOwnPropertyNames(pack)) {
      for await (const key1 of Object.getOwnPropertyNames(pack[key])) {
        if (defPack[key][key1] != null) {
          delete defPack[key][key1];
        }
      }
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

    app = app
      .replace(
        /\/\/ module\.exports = webpack\.react\(\);/i,
        `module.exports = webpack.react();`
      )
      .replace(
        /module\.exports = webpack\.react\(\);/i,
        `// module.exports = webpack.react();`
      );
    await fs.promises.writeFile(
      `${process.cwd()}/webpack.config.js`,
      app,
      "utf-8"
    );
  }

  async js() {
    if (
      fs.existsSync(
        `${path.dirname(require.main?.filename)}/resources/js/react`
      )
    ) {
      await fs.promises.rm(
        `${path.dirname(require.main?.filename)}/resources/js/react`,
        { recursive: true }
      );
      return true;
    }
    return false;
  }

  async css() {
    if (
      fs.existsSync(
        `${path.dirname(require.main?.filename)}/resources/css/react`
      )
    ) {
      await fs.promises.rm(
        `${path.dirname(require.main?.filename)}/resources/css/react`,
        { recursive: true }
      );
      return true;
    }
    return false;
  }
}

export default new ReactUiRollbackCommand();
