import { execute } from "../database/mysql/model/builder/execute";

export const checkMysqlTableExist = async (table: string) => {
  const tables = await execute(
    `SELECT * FROM information_schema.tables WHERE table_schema = '${await (
      config("database.connections") as any
    ).mysql.database}' AND table_name = '${table}' LIMIT 1;`
  );

  return tables.length > 0;
};
