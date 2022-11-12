import { body, validationResult } from "express-validator";
import { Request, Rule } from "../../";
import { mimesTypes } from "./mimesTypes";
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
          response.redirect("back");
          return false;
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
      let next = true;
      for await (const r of rule[field]) {
        if (typeof r == "string") {
          const split = r.split(":");

          if (split[0].trim().length < 1) {
            continue;
          }

          if (!next) {
            break;
          }

          switch (split[0]) {
            case "required":
              if (req.$file(field) == null) {
                (await this.required(field, req)).isEmpty();
              }
              break;
            case "min":
              rules.push(this.min(req, field, parseInt(split[1])));
              break;
            case "confirmation":
              rules.push(this.confirmation(req, field, split[1]));
              break;
            case "nullable":
              next = this.nullable(field, req);
              break;
            case "mimes":
              rules.push(this.mimes(req, field, split[1]));
              break;
            case "max":
              rules.push(this.max(req, field, parseInt(split[1])));
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

  nullable?(field: string, req: Request): boolean {
    if (req.body[field] == null) {
      return false;
    }

    if (String(req.body[field]).trim().length > 0) {
      return true;
    }

    return false;
  }

  min?(req: Request, field: string, size: number) {
    if (Number.isNaN(size)) {
      return body(field).custom(() => true);
    }

    let msg = "Invalid value";
    const v = validation.min;

    if (req.$file(field) != null) {
      if (v.file != null) {
        msg = v.file
          .replace(/:attribute/, field.replace(/_/, " "))
          .replace(/:min/, size);
      }

      if (req.$file(field) != null) {
        return body(field).custom(() => {
          const file = req.$file(field);

          if (file.size < size) {
            return Promise.reject(msg);
          }
          return true;
        });
      }
    } else {
      if (v.string != null) {
        msg = v.string
          .replace(/:attribute/, field.replace(/_/, " "))
          .replace(/:min/, size);
      }
      return body(field).isLength({ min: size }).withMessage(msg).bail();
    }
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

  mimes?(req: Request, field: string, selectedMimes: string) {
    return body(field).custom(async () => {
      let msg = "Invalid value";

      if (validation.confirmation != null) {
        msg = validation.mimes
          .replace(/:attribute/, field.replace(/_/, " "))
          .replace(/:values/, selectedMimes);
      }

      if (req.$file(field) != null) {
        const file = req.$file(field),
          mimetype = file.mimetype;
        const list: any[] = [];

        for await (const m of selectedMimes.split(",")) {
          if (mimesTypes[m] != null) {
            if (!Array.isArray(mimesTypes[m])) {
              list.push(mimesTypes[m]);
            } else {
              for await (const m2 of mimesTypes[m]) {
                list.push(m2);
              }
            }
          }
        }

        if (!list.includes(mimetype)) {
          return Promise.reject(msg);
        }
      }

      return true;
    });
  }

  max?(req: Request, field: string, size: number) {
    if (Number.isNaN(size)) {
      return body(field).custom(() => true);
    }

    let msg = "Invalid value";
    const v = validation.max;

    if (v.file != null) {
      msg = v.file
        .replace(/:attribute/, field.replace(/_/, " "))
        .replace(/:max/, size);
    }

    if (req.$file(field) != null) {
      return body(field).custom(() => {
        const file = req.$file(field);

        if (file.size > size) {
          return Promise.reject(msg);
        }
        return true;
      });
    } else {
      if (v.string != null) {
        msg = v.string
          .replace(/:attribute/, field.replace(/_/, " "))
          .replace(/:max/, size);
      }
      return body(field)
        .isLength({ min: 0, max: size })
        .withMessage(msg)
        .bail();
    }
  }
}
