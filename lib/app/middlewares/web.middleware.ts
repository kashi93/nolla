import { Request, Response, Next } from "../../";

export = (req: Request, res: Response, next: Next) => {
  next();
};
