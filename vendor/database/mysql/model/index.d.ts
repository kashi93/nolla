import Fetch from "./builder/fetch";
import Create from "./builder/create";
declare class Model implements Create, Fetch {
    table: string;
    useTimeStamps: boolean;
    hidden: string[];
    create: (params: {
        [column: string]: any;
    }) => Promise<any>;
    update: (params: {
        [column: string]: any;
    }) => Promise<boolean>;
    delete: () => Promise<boolean>;
    where: (column: string, operator: "=" | "!=" | ">" | "<" | ">=" | "<=", value: any) => this;
    orWhere: (column: string, operator: "=" | "!=" | ">" | "<" | ">=" | "<=", value: any) => this;
    first: () => Promise<any>;
    get: () => Promise<Array<any>>;
    paginate: (perPage?: number, columns?: string[], pageName?: string, page?: number) => Promise<Array<any>>;
    all: () => Promise<Array<any>>;
    toSql: () => string;
}
export default Model;
