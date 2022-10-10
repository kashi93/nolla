var request: { [key: string]: any };

export const thisIsAModule = true;

declare global {
  var request: { [key: string]: any };
}

globalThis.request = {};
