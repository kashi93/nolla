import path from "path";
(async () => {
  const alias: { [key: string]: any } = await config("app.alias");
  for await (const a of Object.getOwnPropertyNames(alias)) {
    const { default: p } = await import(
      `${path.dirname(require.main?.filename)}/${alias[a]}`
    );

    const c: ClassDecorator = new p();

    (globalThis as { [key: string]: any })[a] = c;
  }
})();
