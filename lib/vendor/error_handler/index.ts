import { storeError } from "./storeError";

export = process.on("uncaughtException", (error: Error) => storeError(error));
