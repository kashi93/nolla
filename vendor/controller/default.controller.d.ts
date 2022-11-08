import Validator from "./validator";
import { Request } from "express";
import { Rule } from "../../";
declare class DefaultController implements Validator {
    validate: (req: Request, rule: Rule, sentBack?: boolean) => Promise<any[] | boolean>;
}
export default DefaultController;
