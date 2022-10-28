globalThis.values = {};
globalThis.old = (field: string): any => {
  return global.values[field] || "";
};
globalThis.clearFormValuesSession = () => {
  setTimeout(() => {
    global.values = {};
  }, 3000);
};
