import Fetch from "./builder/fetch";
import Create from "./builder/create";

class Model implements Create, Fetch {
  table: string;
  useTimeStamps: boolean = true;
  hidden: string[] = [];

  create: (params: { [column: string]: any }) => Promise<any>;
  update: (params: { [column: string]: any }) => Promise<boolean>;
  delete: () => Promise<boolean>;
  where: (
    column: string,
    operator: "=" | "!=" | ">" | "<" | ">=" | "<=",
    value: any
  ) => this;
  orWhere: (
    column: string,
    operator: "=" | "!=" | ">" | "<" | ">=" | "<=",
    value: any
  ) => this;
  first: () => Promise<any>;
  get: () => Promise<Array<any>>;
  all: () => Promise<Array<any>>;
  toSql: () => string;
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name !== "constructor") {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    });
  });
}

applyMixins(Model, [Create, Fetch]);

export default Model;
