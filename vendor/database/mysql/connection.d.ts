import { Connection } from "mysql";
import "../../global_functions/config";
declare class mysql {
    open(): Connection;
    close(con: Connection): void;
    query(query: string): Promise<unknown>;
    execute<T>(con: Connection, query: string): Promise<T>;
}
export default mysql;
