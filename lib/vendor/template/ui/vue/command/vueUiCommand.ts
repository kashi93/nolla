import fs from "fs";
import path from "path";

class VueUiCommand {
  async handle() {
    await this.js();
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
    const react_comment = new RegExp(`// import "./vue/main";`);
    app = app.replace(react_comment, `import "./vue/main";`);
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
    app = app
      .replace(
        /\/\/ module\.exports = webpack\.vue\(\);/i,
        `module.exports = webpack.vue();`
      )
      .replace(
        /\/\/ module\.exports = webpack\.bootstrap\(\);/i,
        `module.exports = webpack.bootstrap();`
      )
      .replace(
        /module\.exports = webpack\.bootstrap\(\);/i,
        `// module.exports = webpack.bootstrap();`
      );
    await fs.promises.writeFile(
      `${process.cwd()}/webpack.config.js`,
      app,
      "utf-8"
    );
  }

  async js() {
    if (
      !fs.existsSync(`${path.dirname(require.main?.filename)}/resources/js/vue`)
    ) {
      await fs.promises.mkdir(
        `${path.dirname(require.main?.filename)}/resources/js/vue`
      );
    }
    const jsFiles = await fs.promises.readdir(
      `${path.dirname(require.main?.filename)}/vendor/template/ui/vue/js`
    );

    for await (const js of jsFiles) {
      if (
        !fs
          .lstatSync(
            `${path.dirname(
              require.main?.filename
            )}/vendor/template/ui/vue/js/${js}`
          )
          .isDirectory()
      ) {
        await fs.promises.copyFile(
          `${path.dirname(
            require.main?.filename
          )}/vendor/template/ui/vue/js/${js}`,
          `${path.dirname(
            require.main?.filename
          )}/resources/js/vue/${js.replace(/.txt/, "")}`
        );
      } else {
        if (
          !fs.existsSync(
            `${path.dirname(require.main?.filename)}/resources/js/vue/${js}`
          )
        ) {
          await fs.promises.mkdir(
            `${path.dirname(require.main?.filename)}/resources/js/vue/${js}`
          );
        }

        const childs = await fs.promises.readdir(
          `${path.dirname(
            require.main?.filename
          )}/vendor/template/ui/vue/js/${js}`
        );

        for await (const c of childs) {
          await fs.promises.copyFile(
            `${path.dirname(
              require.main?.filename
            )}/vendor/template/ui/vue/js/${js}/${c}`,
            `${path.dirname(
              require.main?.filename
            )}/resources/js/vue/${js}/${c.replace(/.txt/, "")}`
          );
        }
      }
    }
  }
}

export default new VueUiCommand();
