var response: (data: any, code: number) => Function;

export const thisIsAModule = true;

declare global {
  var response: (data: any, code: number) => Function;
}

globalThis.response = (data: any, code: number = 200): Function => {
  return () => {
    return {
      data,
      code,
    };
  };
};
