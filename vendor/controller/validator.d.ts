import { Request, Rule } from "../../";
export default class Validator {
    validate(req: Request, rule: Rule, sentBack?: boolean): Promise<any[] | boolean>;
    prepare?(rule: Rule, req: Request): Promise<any[]>;
    email?(field: string): import("express-validator").ValidationChain;
    required?(field: string, req: Request): Promise<import("express-validator").Result<any> & {
        context: import("express-validator/src/context").ReadonlyContext;
    }>;
    nullable?(field: string, req: Request): boolean;
    min?(req: Request, field: string, size: number): import("express-validator").ValidationChain;
    confirmation?(req: Request, field1: string, field2: string): import("express-validator").ValidationChain;
    custom?(req: Request, field: string, func: Function): import("express-validator").ValidationChain;
    mimes?(req: Request, field: string, selectedMimes: string): import("express-validator").ValidationChain;
    max?(req: Request, field: string, size: number): import("express-validator").ValidationChain;
}
