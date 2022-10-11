var view: (path: string, data: { [key: string]: any }) => Function;

export const thisIsAModule = true;

declare global {
  var view: (path: string, data: { [key: string]: any }) => Function;
}

globalThis.view = (
  path: string,
  data: { [key: string]: any } = {}
): Function => {
  return () => {
    return {
      view: path,
      data,
    };
  };
};
