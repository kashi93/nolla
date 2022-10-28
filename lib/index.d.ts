import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";

interface Request extends ExpressRequest {
  input: (field: string) => any;
}

interface Response extends ExpressResponse {}
interface Next extends ExpressNextFunction {}

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
  var routeList: any[];
  var route: (name: string) => any;
  var sleep: (ms: number) => Promise<boolean>;
  var view: (path: string, data?: { [key: string]: any }) => Function;
  var auth: {
    user: () => { [key: string]: any } | null;
  };
}
