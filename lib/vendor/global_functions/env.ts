var env: (con: string) => any;

export const thisIsAModule = true;

declare global {
  var env: (con: string) => any;
}

globalThis.env = (con: string): any => {
  try {
    require("dotenv").config();
    const env = process.env;
    return env[con];
  } catch (error) {
    return null;
  }
};
