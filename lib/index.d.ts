import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  move: (path?: string, name?: string) => Promise<string | null>;
}

interface Request extends ExpressRequest {
  input: (field: string) => any;
  file: (field: string) => File | null;
}

interface Response extends ExpressResponse {}
interface Next extends ExpressNextFunction {}

export type Rules =
  | "required"
  | "email"
  | "min:?"
  | `min:${number}`
  | `confirmation:${string}`
  | "nullable"
  | `mimes:${string}`
  | `max:${number}`
  | Function;

export interface Rule {
  [field: string]: Rules[];
}

export interface Router {
  name: string;
  url: string;
  method: string;
  argv: [controllerClassPath: string, method: string] | Function;
  middleware: string[];
}

export const thisIsAModule = true;

declare global {
  var request: Request;
  var response: Response;
  var config: (con: string) => any;
  var env: (con: string) => any;
  var errors: any[];
  var message: string | null;
  var errorHas: (field: string) => boolean;
  var clearFormValidationSession: () => void;
  var values: { [key: string]: any };
  var old: (field: string) => any;
  var clearFormValuesSession: () => void;
  var routeList: Router[];
  var route: (name: string, params?: { [key: string]: any }) => any;
  var sleep: (ms: number) => Promise<boolean>;
  var view: (path: string, data?: { [key: string]: any }) => Function;
  var auth: {
    user: () => { [key: string]: any } | null;
  };
  var storage_path: (path?: string) => string;
  var public_path: (path?: string) => string;
}
