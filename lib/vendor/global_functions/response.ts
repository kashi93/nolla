import { Response } from "express";
var response: Response;

export const thisIsAModule = true;

declare global {
  var response: Response;
}

globalThis.response = null;
