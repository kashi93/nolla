// let col: Readonly<String> = "";
export let params: string[] = [];
export const resetParams = () => {
  params = [];
};

// class PrivateMethod {
//   nullable() {
//     const current_params = params[params.length - 1].replace(/NOT NULL/g, "");
//     params[params.length - 1] = `${current_params} NULL`;
//   }
//   unique() {
//     const current_params = params[params.length - 1];
//     params[params.length - 1] = `${current_params} UNIQUE`;
//   }
//   default(val: string) {
//     const current_params = params[params.length - 1];
//     params[params.length - 1] = `${current_params} DEFAULT '${val}'`;
//   }
//   first(column: string) {
//     params[params.length - 1] = `[ FIRST ${column} ]`;
//   }
//   after(column: string) {
//     params[params.length - 1] = `[ AFTER  ${column} ]`;
//   }
// }

class Table {
  id(
    column = "id",
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} BIGINT NOT NULL AUTO_INCREMENT`);
    } else {
      params.push(`${col} BIGINT NOT NULL AUTO_INCREMENT`);
    }
    params.push(`PRIMARY KEY (${col})`);
  }

  bigIncrements(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(
        `${config.alterMode} ${col} BIGINT UNSIGNED NOT NULL AUTO_INCREMENT`
      );
    } else {
      params.push(`${col} BIGINT UNSIGNED NOT NULL AUTO_INCREMENT`);
    }
  }

  binary(
    column: string,
    config: {
      nullable?: boolean;
      unique?: boolean;
      default?: any;
      first?: string;
      last?: string;
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    // col = column;
    let query = `'${column}' BLOB`;

    if ((config.nullable || false) === true) {
      query += "NULL";
    } else {
      query += "NOT NULL";
    }

    if ((config.unique || false) === true) {
      query += "UNIQUE";
    }

    if (String(config.default || "").trim().length > 0) {
      query += `DEFAULT '${config.default}'`;
    }

    if (String(config.first || "").trim().length > 0) {
      query += `[ FIRST ${config.first} ]`;
    }

    if (String(config.last || "").trim().length > 0) {
      query += `[ LAST ${config.last} ]`;
    }

    if (config.alterMode != null) {
      query = `${config.alterMode} ${query}`;
    }

    params.push(query);
  }

  boolean(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} BOOLEAN NOT NULL`);
    } else {
      params.push(`${col} BOOLEAN NOT NULL`);
    }
    return new PrivateMethod();
  }

  char(
    column: string,
    config: {
      length: number;
      alterMode?: "ADD" | "MODIFY";
    }
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} CHAR(${length}) NOT NULL`);
    } else {
      params.push(`${col} CHAR(${length}) NOT NULL`);
    }
    return new PrivateMethod();
  }

  dateTime(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} DATETIME NOT NULL`);
    } else {
      params.push(`${col} DATETIME NOT NULL`);
    }
    return new PrivateMethod();
  }

  date(
    column: string,
    config: {
      length: number;
      alterMode?: "ADD" | "MODIFY";
    }
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} DATE NOT NULL`);
    } else {
      params.push(`${col} DATE NOT NULL`);
    }
    return new PrivateMethod();
  }

  decimal(
    column: string,
    config: {
      precision?: number;
      scale?: number;
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(
        `${config.alterMode} ${col} DECIMAL(${config.precision || 8},${
          config.scale || 2
        }) NOT NULL`
      );
    } else {
      params.push(
        `${col} DECIMAL(${config.precision || 8},${config.scale || 2}) NOT NULL`
      );
    }

    return new PrivateMethod();
  }

  double(
    column: string,
    config: {
      precision?: number;
      scale?: number;
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(
        `${config.alterMode} ${col} DOUBLE(${config.precision},${config.scale}) NOT NULL`
      );
    } else {
      params.push(
        `${col} DOUBLE(${config.precision},${config.scale}) NOT NULL`
      );
    }
    return new PrivateMethod();
  }

  float(
    column: string,
    config: {
      precision?: number;
      scale?: number;
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(
        `${config.alterMode} ${col} FLOAT(${config.precision},${config.scale}) NOT NULL`
      );
    } else {
      params.push(`${col} FLOAT(${config.precision},${config.scale}) NOT NULL`);
    }
    return new PrivateMethod();
  }

  enum(
    column: string,
    values: string[],
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    const val = values.map((v) => `'${v}'`);
    if (config.alterMode != null) {
      params.push(
        `${config.alterMode} ${col} ENUM (${val.join(",")}) NOT NULL`
      );
    } else {
      params.push(`${col} ENUM (${val.join(",")}) NOT NULL`);
    }
    return new PrivateMethod();
  }

  int(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} INTEGER NOT NULL`);
    } else {
      params.push(`${col} INTEGER NOT NULL`);
    }
    return new PrivateMethod();
  }

  bigInt(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} BIGINT NOT NULL`);
    } else {
      params.push(`${col} BIGINT NOT NULL`);
    }
    return new PrivateMethod();
  }

  unsignedBigInt(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} BIGINT UNSIGNED NOT NULL`);
    } else {
      params.push(`${col} BIGINT UNSIGNED NOT NULL`);
    }
    return new PrivateMethod();
  }

  smallInt(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} SMALLINT NOT NULL`);
    } else {
      params.push(`${col} SMALLINT NOT NULL`);
    }
    return new PrivateMethod();
  }

  unsignedSmallInt(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} SMALLINT UNSIGNED NOT NULL`);
    } else {
      params.push(`${col} SMALLINT UNSIGNED NOT NULL`);
    }
    return new PrivateMethod();
  }

  tinyInt(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} TINYINT NOT NULL`);
    } else {
      params.push(`${col} TINYINT NOT NULL`);
    }
    return new PrivateMethod();
  }

  unsignedTinyInt(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} TINYINT UNSIGNED NOT NULL`);
    } else {
      params.push(`${col} TINYINT UNSIGNED NOT NULL`);
    }
    return new PrivateMethod();
  }

  string(
    column: string,
    config: {
      length?: number;
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(
        `${config.alterMode} ${col} VARCHAR(${config.length || 255}) NOT NULL`
      );
    } else {
      params.push(`${col} VARCHAR(${config.length || 255}) NOT NULL`);
    }
    return new PrivateMethod();
  }

  longText(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} LONGTEXT NOT NULL`);
    } else {
      params.push(`${col} LONGTEXT NOT NULL`);
    }
    return new PrivateMethod();
  }

  mediumText(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} MEDIUMTEXT NOT NULL`);
    } else {
      params.push(`${col} MEDIUMTEXT NOT NULL`);
    }
    return new PrivateMethod();
  }

  timestamp(
    column: string,
    config: {
      alterMode?: "ADD" | "MODIFY";
    } = {}
  ) {
    col = column;
    if (config.alterMode != null) {
      params.push(`${config.alterMode} ${col} TIMESTAMP NOT NULL`);
    } else {
      params.push(`${col} TIMESTAMP NOT NULL`);
    }
    return new PrivateMethod();
  }

  timestamps() {
    params.push(`created_at TIMESTAMP NULL`);
    params.push(`updated_at TIMESTAMP NULL`);
  }

  custom(statement: string) {
    params.push(statement);
  }
}

export default new Table();
