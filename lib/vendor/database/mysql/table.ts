let col: Readonly<String> = "";
export let params: string[] = [];

class PrivateMethod {
  nullable() {
    const current_params = params[params.length - 1].replace(/NOT NULL/g, "");
    params[params.length - 1] = `${current_params} NULL`;
  }
  unique() {
    const current_params = params[params.length - 1];
    params[params.length - 1] = `${current_params} UNIQUE`;
  }
}

class Table {
  id(column = "id") {
    col = column;
    params.push(`${col} BIGINT NOT NULL AUTO_INCREMENT`);
    params.push(`PRIMARY KEY (${col})`);
  }

  bigInt(column: string) {
    col = column;
    params.push(`${col} BIGINT NOT NULL`);
    return new PrivateMethod();
  }

  string(column: string, length = 255) {
    col = column;
    params.push(`${col} VARCHAR(${length}) NOT NULL`);
    return new PrivateMethod();
  }

  longText(column: string) {
    col = column;
    params.push(`${col} longtext NOT NULL`);
    return new PrivateMethod();
  }

  timestamp(column: string) {
    col = column;
    params.push(`${col} TIMESTAMP NOT NULL`);
    return new PrivateMethod();
  }

  timestamps() {
    params.push(`created_at TIMESTAMP NULL`);
    params.push(`updated_at TIMESTAMP NULL`);
  }

  custom(statement: string) {
    params.push(statement);
  }

  resetParams() {
    params = [];
  }
}

export default new Table();
