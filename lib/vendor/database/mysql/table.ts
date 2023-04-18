import { TableConfig } from "../../..";

export let params: string[] = [];
export const resetParams = () => {
  params = [];
};

const configTranslate = (query: string, config: TableConfig): void => {
  if ((config.nullable || false) === true) {
    query += " NULL";
  } else {
    query += " NOT NULL";
  }

  if ((config.unique || false) === true) {
    query += " UNIQUE";
  }

  if (String(config.default || "").trim().length > 0) {
    query += ` DEFAULT \`${config.default}\``;
  }

  if (String(config.after || "").trim().length > 0) {
    query += ` AFTER \`${config.after}\``;
  }

  if (config.alterMode != null) {
    query = `${config.alterMode} ${query}`;
  }

  params.push(query);
}

class Table {
  id(column: string = "id") {
    params.push(`${column} BIGINT NOT NULL AUTO_INCREMENT`);
    params.push(`PRIMARY KEY (${column})`);
  }

  double(column: string, config: TableConfig = {}) {
    let query = `\`${column}\` DOUBLE`;

    if (config.precision != null && config.scale != null) {
      query += `(${config.precision},${config.scale})`;
    }

    configTranslate(query, config)
  }

  float(column: string, config: TableConfig = {}) {
    let query = `\`${column}\` FLOAT`;

    if (config.precision != null && config.scale != null) {
      query += `(${config.precision},${config.scale})`;
    }

    configTranslate(query, config)
  }

  timestamps() {
    params.push(`created_at TIMESTAMP NULL`);
    params.push(`updated_at TIMESTAMP NULL`);
  }

  custom(statement: string) {
    params.push(statement);
  }

  bigIncrements = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` BIGINT UNSIGNED AUTO_INCREMENT`, config)
  binary = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` BLOB`, config)
  boolean = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` BOOLEAN`, config)
  char = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` CHAR(${length})`, config)
  dateTime = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` DATETIME`, config)
  date = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` DATE NOT NULL`, config)
  decimal = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` DECIMAL(${config.precision || 8},${config.scale || 2})`, config)
  enum = (column: string,values: string[],config: TableConfig = {})=>configTranslate(`\`${column}\` ENUM (${values.map((v) => `'${v}'`).join(",")})`, config)
  int = (column: string, config: TableConfig= {}) => configTranslate(`\`${column}\` INTEGER`, config)
  bigInt = (column: string, config: TableConfig= {}) => configTranslate(`\`${column}\` BIGINT`, config)
  unsignedBigInt = (column: string, config: TableConfig= {}) => configTranslate(`\`${column}\` BIGINT UNSIGNED`, config)
  smallInt = (column: string, config: TableConfig= {}) => configTranslate(`\`${column}\` SMALLINT`, config)
  unsignedSmallInt = (column: string, config: TableConfig= {}) => configTranslate(`\`${column}\` SMALLINT UNSIGNED`, config)
  tinyInt = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` TINYINT`, config)
  unsignedTinyInt = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` TINYINT UNSIGNED`, config)
  string = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` VARCHAR(${config.length || 255})`, config)
  longText = (column: string, config: TableConfig= {}) => configTranslate(`\`${column}\` LONGTEXT`, config)
  mediumText = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` MEDIUMTEXT`, config)
  timestamp = (column: string, config: TableConfig = {}) => configTranslate(`\`${column}\` TIMESTAMP`, config)
  dropColumn = (column: string) => params.push(` DROP COLUMN \`${column}\``)
}

export default new Table();
