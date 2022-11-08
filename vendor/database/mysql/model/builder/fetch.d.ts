import Delete from "./delete";
import Update from "./update";
declare class Fetch implements Update, Delete {
    table: string;
    update: (params: {
        [column: string]: any;
    }) => Promise<boolean>;
    delete: () => Promise<boolean>;
    where(column: string, operator: "=" | "!=" | ">" | "<" | ">=" | "<=", value: any): this;
    orWhere(column: string, operator: "=" | "!=" | ">" | "<" | ">=" | "<=", value: any): this;
    first(): Promise<any>;
    get(): Promise<Array<any>>;
    paginate(perPage?: number, columns?: string[], pageName?: string, page?: number): Promise<any>;
    all(): Promise<Array<any>>;
    toSql(): string;
}
export default Fetch;
