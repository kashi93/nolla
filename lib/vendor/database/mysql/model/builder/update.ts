import { dataToMysqlValue } from "../../../../rainbows/dataToMysqlValue";
import { dateTime } from "../../../../rainbows/dateTime";
import { execute } from "./execute";

export default class Update {
  useTimeStamps?: boolean = true;
  table?: string;
  params?: string;
  created_at?: any = null;
  updated_at?: any = null;

  update(params: { [column: string]: any }) {
    return new Promise(async (res, rej) => {
      try {
        let p = await this.objToParam2(params);
        p = await this.updateTimeStamp(p);
        const query = `UPDATE ${this.table} SET ${p.data.join(",")} ${
          this.params
        }`;
        delete this.params;
        await execute(query);
        res(true);
      } catch (error) {
        rej(error);
      }
    });
  }

  async objToParam2?(obj: { [column: string]: any }) {
    const data: any[] = [];
    const keys = Object.getOwnPropertyNames(obj);

    for await (const key of keys) {
      if (key == "created_at") {
        this.created_at = `${key}=${dataToMysqlValue(obj[key])}`;
      } else if (key == "updated_at") {
        this.updated_at = `${key}=${dataToMysqlValue(obj[key])}`;
      } else {
        data.push(`${key}=${dataToMysqlValue(obj[key])}`);
      }
    }

    return {
      data,
    };
  }

  async updateTimeStamp?(current_params: any) {
    if (this.useTimeStamps) {
      if (this.updated_at == null) {
        current_params.data.push(`updated_at='${dateTime()}'`);
      } else {
        current_params.data.push(`updated_at='${this.updated_at}'`);
      }
    }
    return current_params;
  }
}
