globalThis.config = (con: string) => {
  const params = con.split(".");
  const path = require("path");
  const { default: c } = require(`${path.dirname(
    require.main?.filename
  )}/config/${params[0]}`);

  if (params.length == 1) {
    return c;
  }

  for (let index = 1; index < params.length; index++) {
    if (c[params[index]] != undefined) {
      return c[params[index]];
    }
  }

  return null;
};
