var routeList: any[];
var route: (name: string) => any;

export const thisIsAModule = true;

declare global {
  var routeList: any[];
  var route: (name: string) => any;
}

globalThis.routeList = [];
globalThis.route = (name: string): any => {
  const s: any[] = global.routeList.filter((r) => r.name == name);
  if (s.length < 1) {
    throw `Route ${name} don't exist`;
  }

  return s[0].url;
};
