import fs from "fs";
import { dateTime } from "../rainbows/dateTime";

export const storeError = async (error: Error) => {
  const path = require("path");

  try {
    if (
      fs.existsSync(
        `${path.dirname(require.main?.filename)}/storage/logs/nolla.log`
      )
    ) {
      let f = await fs.promises.readFile(
        `${path.dirname(require.main?.filename)}/storage/logs/nolla.log`,
        "utf-8"
      );

      f += "\n";
      f += `[${dateTime()}]:${error.stack}`;

      fs.writeFileSync(
        `${path.dirname(require.main?.filename)}/storage/logs/nolla.log`,
        f,
        "utf-8"
      );
    } else {
      fs.writeFileSync(
        `${path.dirname(require.main?.filename)}/storage/logs/nolla.log`,
        `[${dateTime()}]:${error.stack}`,
        "utf-8"
      );
    }
  } catch (error) {
    if (
      fs.existsSync(
        `${path.dirname(require.main?.filename)}/storage/logs/nolla.log`
      )
    ) {
      let f = await fs.promises.readFile(
        `${path.dirname(require.main?.filename)}/storage/logs/nolla.log`,
        "utf-8"
      );

      f += "\n";
      f += `[${dateTime()}]:${error.stack}`;

      fs.writeFileSync(
        `${path.dirname(require.main?.filename)}/storage/logs/nolla.log`,
        f,
        "utf-8"
      );
    } else {
      fs.writeFileSync(
        `${path.dirname(require.main?.filename)}/storage/logs/nolla.log`,
        `[${dateTime()}]:${error.stack}`,
        "utf-8"
      );
    }
  }
};
