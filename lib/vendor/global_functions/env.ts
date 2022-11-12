import {} from "../../";
globalThis.env = (con: string): any => {
  try {
    require("dotenv").config();
    const env = process.env;
    return env[con];
  } catch (error) {
    return null;
  }
};
