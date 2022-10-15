import fs from "fs";
import path from "path";

class ReactUiCommand {
  async handle() {
    await this.js();
    await this.css();
    await this.app();
    await this.webpack();
    await this.pack();
    return;
  }

  async app() {
    let app = await fs.promises.readFile(
      `${path.dirname(require.main?.filename)}/resources/js/app.js`,
      "utf-8"
    );
    const react_comment = new RegExp(`// import "./react/index";`);
    app = app.replace(react_comment, `import "./react/index";`);
    await fs.promises.writeFile(
      `${path.dirname(require.main?.filename)}/resources/js/app.js`,
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
    const react_comment = new RegExp(`// module.exports = webpack.react;`);
    app = app.replace(react_comment, `module.exports = webpack.react;`);
    await fs.promises.writeFile(
      `${process.cwd()}/webpack.config.js`,
      app,
      "utf-8"
    );
  }

  async css() {
    if (
      !fs.existsSync(
        `${path.dirname(require.main?.filename)}/resources/css/react`
      )
    ) {
      await fs.promises.mkdir(
        `${path.dirname(require.main?.filename)}/resources/css/react`
      );
    }

    const csFiles = await fs.promises.readdir(
      `${path.dirname(require.main?.filename)}/vendor/template/ui/react/css`
    );

    for await (const css of csFiles) {
      await fs.promises.copyFile(
        `${path.dirname(
          require.main?.filename
        )}/vendor/template/ui/react/css/${css}`,
        `${path.dirname(require.main?.filename)}/resources/css/react/${css}`
      );
    }
  }

  async js() {
    if (
      !fs.existsSync(
        `${path.dirname(require.main?.filename)}/resources/js/react`
      )
    ) {
      await fs.promises.mkdir(
        `${path.dirname(require.main?.filename)}/resources/js/react`
      );
    }
    const jsFiles = await fs.promises.readdir(
      `${path.dirname(require.main?.filename)}/vendor/template/ui/react/js`
    );
    for await (const js of jsFiles) {
      await fs.promises.copyFile(
        `${path.dirname(
          require.main?.filename
        )}/vendor/template/ui/react/js/${js}`,
        `${path.dirname(require.main?.filename)}/resources/js/react/${js}`
      );
    }
  }
}

export default new ReactUiCommand();
