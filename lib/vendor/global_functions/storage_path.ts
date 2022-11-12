import {} from "../../";

globalThis.storage_path = (path: string = "") => {
  const _path = require("path");
  const p = require(`${_path.dirname(require.main?.filename)}/${path}`);

  return p;
};
