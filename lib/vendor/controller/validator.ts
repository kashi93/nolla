import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { Rule } from "./types/validator";

export default class Validator {
  async validate(req: Request, rule: Rule) {
    const rules = await this.prepare(rule);
    await Promise.all(rules.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    console.log(errors.array());
  }

  async prepare?(rule: Rule): Promise<any[]> {
    const rules: any[] = [];
    for await (const field of Object.getOwnPropertyNames(rule)) {
      for await (const r of rule[field]) {
        rules.push(this[r](field));
      }
    }
    return rules;
  }

  email?(field: string) {
    return body(field).isEmail().bail();
  }

  required?(field: string) {
    return body(field).trim().escape().not().isEmpty().bail();
  }
}
