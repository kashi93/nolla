globalThis.routeList = [];
globalThis.route = (name: string, params: { [key: string]: any } = {}): any => {
  const s: any[] = global.routeList.filter((r) => r.name == name);
  if (s.length < 1) {
    throw new Error(`Route ${name} don't exist`);
  }

  let url: string = s[0].url;
  const split = url.split("/");

  for (let index = 0; index < split.length; index++) {
    const split2 = split[index].split(":");
    if (split2[1] != null) {
      if (params[split2[1]] == null) {
        throw new Error(`Route ${name} parameter ${split2[1]} is required`);
      }
      split[index] = params[split2[1]];
    }
  }

  url = split.join("/");

  return url;
};
