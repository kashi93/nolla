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
  move: (publicPath?: string, name?: string) => Promise<string | null>;
}

export interface Request extends ExpressRequest {
  input?: (field: string) => any;
  all?: () => { [key: string]: any };
  $file?: (field: string) => File;
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
  controller: string | Function;
  middleware: string[];
}

export interface RouteCollection {
  uuid: string;
  startControllerNameSpace: boolean;
  controllerNameSpace: string | null;
  endControllerNameSpace: boolean;
  startMiddleware: boolean;
  middleware: string | null;
  endMiddleware: boolean;
  startPrefix: boolean;
  prefix: string | null;
  endPrefix: boolean;
  url: string | null;
  argv: [controllerClassPath: string, method: string] | Function | null;
  method: "POST" | "GET" | null;
  name: string | null;
}

export const thisIsAModule = true;

declare global {
  var request: Request;
  var response: Response;
  var config: (con: string) => Promise<any>;
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
