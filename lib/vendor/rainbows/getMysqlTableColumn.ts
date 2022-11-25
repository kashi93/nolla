import { execute } from "../database/mysql/model/builder/execute";

export const getMysqlTableColumn = async (table: string) => {
  const db = await config("database.connections");
  const data: any = {};
  const columns = await execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${db.mysql.database}' AND TABLE_NAME = '${table}';`
  );

  for await (const column of columns) {
    if (
      column.COLUMN_NAME != "created_at" &&
      column.COLUMN_NAME != "updated_at"
    ) {
      data[column.COLUMN_NAME] = null;
    }
  }

  return data;
};
