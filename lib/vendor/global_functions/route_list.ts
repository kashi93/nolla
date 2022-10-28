globalThis.routeList = [];
globalThis.route = (name: string): any => {
  const s: any[] = global.routeList.filter((r) => r.name == name);
  if (s.length < 1) {
    throw new Error(`Route ${name} don't exist`);
  }

  return s[0].url;
};
