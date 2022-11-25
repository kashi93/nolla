import { execute } from "../database/mysql/model/builder/execute";

export const checkMysqlTableExist = async (table: string) => {
  const db = await config("database.connections");
  const tables = await execute(
    `SELECT * FROM information_schema.tables WHERE table_schema = '${db.mysql.database}' AND table_name = '${table}' LIMIT 1;`
  );

  return tables.length > 0;
};
