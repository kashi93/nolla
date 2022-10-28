(async () => {
  const alias = config("app.alias");
  for await (const a of Object.getOwnPropertyNames(alias)) {
    const path = require("path");
    const p = require(`${path.dirname(require.main?.filename)}/${alias[a]}`);
    const c: ClassDecorator = new p();

    (globalThis as { [key: string]: any })[a] = c;
  }
})();
