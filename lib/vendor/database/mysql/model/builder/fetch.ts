import Collection from "./dbCollection";
import Delete from "./delete";
import { execute } from "./execute";
import Update from "./update";

class Fetch implements Update, Delete {
  table: string;

  update: (params: { [column: string]: any }) => Promise<boolean>;
  delete: () => Promise<boolean>;

  where(
    column: string,
    operator: "=" | "!=" | ">" | "<" | ">=" | "<=",
    value: any
  ): this {
    const self = this as any;

    if (self.params != null) {
      if (value == null || value == undefined) {
        self.params += ` AND ${column} ${operator} NULL`;
      } else {
        self.params += ` AND ${column} ${operator} '${value}'`;
      }
    } else {
      if (value == null || value == undefined) {
        self.params = ` WHERE ${column} ${operator} NULL`;
      } else {
        self.params = ` WHERE ${column} ${operator} '${value}'`;
      }
    }
    return this;
  }

  orWhere(
    column: string,
    operator: "=" | "!=" | ">" | "<" | ">=" | "<=",
    value: any
  ): this {
    const self = this as any;
    if (value == null || value == undefined) {
      self.params += ` OR ${column} ${operator} NULL`;
    } else {
      self.params += ` OR ${column} ${operator} '${value}'`;
    }
    return this;
  }

  async first(): Promise<any> {
    const self = this as any;
    const query = `SELECT * FROM ${this.table} ${self.params} LIMIT 1`;
    const d1: any[] = await execute(query);
    delete self.params;

    if (d1.length < 1) {
      return null;
    }

    return await Collection.make(this, d1[0]);
  }

  async get(): Promise<any[]> {
    const data: any[] = [];
    const self = this as any;
    const query = `SELECT * FROM ${this.table} ${self.params}`;
    const d1: any[] = await execute(query);

    for await (const d of d1) {
      data.push(await Collection.make(this, d));
    }

    delete self.params;
    return data;
  }

  async paginate(
    perPage: number = null,
    columns: string[] = ["*"],
    pageName: string = "page",
    page: number = null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const self = this as any;
      perPage = perPage || 10;

      if (request.input("page") != null) {
        page = request.input("page");
      }

      let numRows: number;
      let queryPagination;
      let numPages: number;
      const skip = page * perPage;
      const limit = skip + "," + perPage;

      execute(`SELECT count(*) as numRows FROM ${this.table}`)
        .then((results) => {
          numRows = results[0].numRows;
          numPages = Math.ceil(numRows / perPage);
        })
        .then(() =>
          execute(
            `SELECT ${columns.join(",")} FROM ${this.table} ${
              self.params
            } LIMIT ${limit}`
          )
        )
        .then(async (query) => {
          const data: any[] = [];

          for await (const q of query) {
            data.push(await Collection.make(this, q));
          }

          resolve({
            $_MySql: true,
            total: numRows,
            last_page: numPages,
            data,
            per_page: perPage,
            current_page: page,
          });
        });
    });
  }

  async all(): Promise<any[]> {
    const data: any[] = [];
    const self = this as any;
    const query = `SELECT * FROM ${this.table}`;
    const d1: any[] = await execute(query);

    for await (const d of d1) {
      data.push(await Collection.make(this, d));
    }

    delete self.params;

    return data;
  }

  toSql(): string {
    const self = this as any;
    return `SELECT * FROM ${this.table} ${self.params}`;
  }
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name !== "constructor") {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    });
  });
}

applyMixins(Fetch, [Update, Delete]);
export default Fetch;
