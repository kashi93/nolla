import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validatorMessage } from "./validatorMessage";

class Validator {
  rules: Array<any> = [];

  async make({ req }: { req: Request }, rule: any) {
    const rules = Object.getOwnPropertyNames(rule);
    for await (const r1 of rules) {
      const rows = rule[r1];
      for await (const r2 of rows) {
        let found = false;
        let b = null;
        const key = r2.split(":");

        switch (key[0]) {
          case "required":
            const required = await body(r1).not().isEmpty().run(req);
            found = !required.isEmpty();
            b = body(r1, validatorMessage.required).not().isEmpty();
            break;
          case "email":
            const email = await body(r1).isEmail().run(req);
            found = !email.isEmpty();
            b = body(r1, validatorMessage.email).isEmail();
            break;
          case "min":
            const min = await body(r1)
              .isLength({
                min: key[1],
                max: undefined,
              })
              .run(req);
            found = !min.isEmpty();
            b = body(r1, validatorMessage.min).isLength({
              min: key[1],
              max: undefined,
            });

            break;

          case "confirm":
            const confirm = await body(r1).equals(req.body[key[1]]).run(req);
            found = !confirm.isEmpty();
            b = body(r1).equals(req.body[key[1]]);
            break;
          default:
            throw new Error(`Rule ${key[0]} don"t exists!`);
            break;
        }

        if (found) {
          if (b != null) {
            this.rules.push(b);
          }
          break;
        }
      }
    }

    return this;
  }

  async validate({ req }: { req: Request }) {
    await Promise.all(this.rules.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        errors: errors.array(),
      };
    }

    return {
      errors: [],
    };
  }
}

export default new Validator();
