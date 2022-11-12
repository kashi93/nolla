import Validator from "./validator";
import { Rule, Request } from "../../";

class DefaultController implements Validator {
  validate: (
    req: Request,
    rule: Rule,
    sentBack?: boolean
  ) => Promise<any[] | boolean>;
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

applyMixins(DefaultController, [Validator]);

export default DefaultController;
