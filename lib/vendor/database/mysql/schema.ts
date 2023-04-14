import { checkMysqlTableExist } from "../../rainbows/checkMysqlTableExist";
import mysql from "./connection";
import Table, { params, resetParams } from "./table";

class Schema {
  async create(name: string, cb: (table: typeof Table) => void): Promise<void> {
    cb(Table);
    if (!(await checkMysqlTableExist(name))) {
      await new mysql().query(`CREATE TABLE ${name} (${params.join(",")})`);
    }
    resetParams();
  }

  async table(name: string, cb: (table: typeof Table) => void): Promise<void> {
    cb(Table);
    // console.log(params);

    resetParams();
  }

  async dropIfExists(name: string): Promise<void> {
    await new mysql().query(`DROP TABLE IF EXISTS ${name};`);
  }
}

export default new Schema();
