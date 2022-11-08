import { Request, File } from "../../";
export default class RequestDefault {
    [key: string]: any;
    generateRequest(req: Request): void;
    input(field: string): any;
    file(field: string): File | null;
}
