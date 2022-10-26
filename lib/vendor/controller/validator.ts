import { body, validationResult } from "express-validator";
import { Request } from "express";
import { Rule } from "./types/validator";
const {
  default: validation,
} = require("../../resources/views/lang/validation");

export default class Validator {
  async validate(
    req: Request,
    rule: Rule,
    sentBack: boolean = true
  ): Promise<any[] | boolean> {
    const rules = await this.prepare(rule, req);
    await Promise.all(rules.map((validation) => validation.run(req)));
    const err = validationResult(req);
    errors = err.array();

    if (err.array().length > 0) {
      if (sentBack) {
        try {
          response.redirect(req.path);
          return err.array();
        } catch (error) {
          console.log(error);
        }
      } else {
        return err.array();
      }
    }

    return true;
  }

  async prepare?(rule: Rule, req: Request): Promise<any[]> {
    const rules: any[] = [];
    for await (const field of Object.getOwnPropertyNames(rule)) {
      for await (const r of rule[field]) {
        if (typeof r == "string") {
          const split = r.split(":");

          if (split[0].trim().length < 1) {
            continue;
          }

          switch (split[0]) {
            case "required":
              (await this.required(field, req)).isEmpty();
              break;
            case "min":
              rules.push(this.min(field, parseInt(split[1])));
              break;
            case "confirmation":
              rules.push(this.confirmation(req, field, split[1]));
              break;
            default:
              rules.push((this as any)[split[0]](field));
              break;
          }
        } else if (typeof r == "function") {
          rules.push(this.custom(req, field, r));
        }
      }
    }
    return rules;
  }

  email?(field: string) {
    let msg = "Invalid value";

    if (validation.email != null) {
      msg = validation.email.replace(/:attribute/, field.replace(/_/, " "));
    }

    return body(field).isEmail().withMessage(msg).bail();
  }

  required?(field: string, req: Request) {
    let msg = "Invalid value";

    if (validation.required != null) {
      msg = validation.required.replace(/:attribute/, field.replace(/_/, " "));
    }

    return body(field)
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage(msg)
      .run(req);
  }

  min?(field: string, length: number) {
    let msg = "Invalid value";

    if (validation.min != null) {
      msg = validation.min
        .replace(/:attribute/, field.replace(/_/, " "))
        .replace(/:min/, length);
    }
    return body(field).isLength({ min: length }).withMessage(msg).bail();
  }

  confirmation?(req: Request, field1: string, field2: string) {
    let msg = "Invalid value";

    if (validation.confirmation != null) {
      msg = validation.confirmation.replace(
        /:attribute/,
        field2.replace(/_/, " ")
      );
    }

    return body(field1).custom(() => {
      if (req.body[field1].trim() != req.body[field2].trim()) {
        return Promise.reject(msg);
      }
      return true;
    });
  }

  custom?(req: Request, field: string, func: Function) {
    return body(field).custom(async () => {
      let err;
      const fail = (val: string) => (err = val);
      await func(field, req.body[field], fail);
      if (err != null) {
        return Promise.reject(err);
      }
      return true;
    });
  }
}
