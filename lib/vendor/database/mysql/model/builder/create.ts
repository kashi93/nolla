import { dataToMysqlValue } from "../../../../rainbows/dataToMysqlValue";
import { dateTime } from "../../../../rainbows/dateTime";
import { getMysqlTableColumn } from "../../../../rainbows/getMysqlTableColumn";
import { execute } from "./execute";

export default class Create {
  table: string = "";
  useTimeStamps: boolean = true;
  private created_at?: any = null;
  private updated_at?: any = null;

  create(params: { [column: string]: string | number | null }) {
    return new Promise(async (res, rej) => {
      try {
        const columns = await getMysqlTableColumn(this.table);
        let p = await this.objToParam1({
          ...columns,
          ...params,
        });
        p = await this.createTimeStamp(p);
        const query = `INSERT INTO ${this.table} (${p.columns.join(
          ","
        )}) VALUES (${p.data.join(",")})`;
        res(await execute(query));
      } catch (error) {
        rej(error);
      }
    });
  }

  private async createTimeStamp?(current_params: {
    columns: Array<any>;
    data: Array<any>;
  }): Promise<{ columns: Array<any>; data: Array<any> }> {
    if (this.useTimeStamps) {
      if (this.created_at == null) {
        current_params.columns.push("created_at");
        current_params.data.push(`'${dateTime()}'`);
      } else {
        current_params.columns.push("created_at");
        current_params.data.push(this.created_at);
      }

      if (this.updated_at == null) {
        current_params.columns.push("updated_at");
        current_params.data.push(`'${dateTime()}'`);
      } else {
        current_params.columns.push("updated_at");
        current_params.data.push(this.updated_at);
      }
    }
    return current_params;
  }

  private async objToParam1?(
    obj: any
  ): Promise<{ columns: Array<any>; data: Array<any> }> {
    const columns: Array<any> = [];
    const data: Array<any> = [];
    const keys: Array<any> = Object.getOwnPropertyNames(obj);

    for await (const key of keys) {
      if (key == "created_at") {
        this.created_at = `${dataToMysqlValue(obj[key])}`;
      } else if (key == "updated_at") {
        this.updated_at = `${dataToMysqlValue(obj[key])}`;
      } else {
        columns.push(key);
        data.push(`${dataToMysqlValue(obj[key])}`);
      }
    }

    return {
      columns,
      data,
    };
  }
}
