var sleep: (con: string) => any;

export const thisIsAModule = true;

declare global {
  var sleep: (ms: number) => Promise<boolean>;
}

globalThis.sleep = (ms: number): Promise<boolean> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, ms);
  });
};
