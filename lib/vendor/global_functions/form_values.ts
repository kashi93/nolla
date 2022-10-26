var values: { [key: string]: any };
var old: (field: string) => any;
var clearFormValuesSession: () => void;

export const thisIsAModule = true;

declare global {
  var values: { [key: string]: any };
  var old: (field: string) => any;
  var clearFormValuesSession: () => void;
}

globalThis.values = {};
globalThis.old = (field: string): any => {
  return global.values[field] || "";
};
globalThis.clearFormValuesSession = () => {
  setTimeout(() => {
    global.values = {};
  }, 3000);
};
