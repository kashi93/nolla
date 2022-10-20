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
  ): Promise<any[] | null> {
    const rules = await this.prepare(rule, req);
    await Promise.all(rules.map((validation) => validation.run(req)));
    const err = validationResult(req);
    errors = err.array();
    if (sentBack) {
      try {
        response.redirect(req.path);
        return;
      } catch (error) {
        console.log(error);
      }
    }
    return err.array();
  }

  async prepare?(rule: Rule, req: Request): Promise<any[]> {
    const rules: any[] = [];
    for await (const field of Object.getOwnPropertyNames(rule)) {
      for await (const r of rule[field]) {
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
          default:
            if (typeof split[0] == "string") {
              rules.push((this as any)[split[0]](field));
            }
            break;
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
}
