import { Request } from "../../";
export default class RequestDefault {
  [key: string]: any;

  generateRequest(req: Request): void {
    request = req;
    req.input = this.input;
  }

  input(field: string) {
    const val = this.body[field];
    return val;
  }
}
