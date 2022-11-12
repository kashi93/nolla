import fs from "fs";
import { dateTime } from "../rainbows/dateTime";

export const storeError = async (error: Error) => {
  const path = require("path");

  try {
    if (fs.existsSync(`${process.cwd()}/storage/logs/nolla.log`)) {
      let f = await fs.promises.readFile(
        `${process.cwd()}/storage/logs/nolla.log`,
        "utf-8"
      );

      f += "\n";
      f += `[${dateTime()}]:${error.stack}`;

      fs.writeFileSync(`${process.cwd()}/storage/logs/nolla.log`, f, "utf-8");
    } else {
      fs.writeFileSync(
        `${process.cwd()}/storage/logs/nolla.log`,
        `[${dateTime()}]:${error.stack}`,
        "utf-8"
      );
    }
  } catch (error) {
    if (fs.existsSync(`${process.cwd()}/storage/logs/nolla.log`)) {
      let f = await fs.promises.readFile(
        `${process.cwd()}/storage/logs/nolla.log`,
        "utf-8"
      );

      f += "\n";
      f += `[${dateTime()}]:${error.stack}`;

      fs.writeFileSync(`${process.cwd()}/storage/logs/nolla.log`, f, "utf-8");
    } else {
      fs.writeFileSync(
        `${process.cwd()}/storage/logs/nolla.log`,
        `[${dateTime()}]:${error.stack}`,
        "utf-8"
      );
    }
  }
};
