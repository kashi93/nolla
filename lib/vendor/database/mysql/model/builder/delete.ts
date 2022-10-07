import { execute } from "./execute";

export default class Delete {
  table?: string;
  params?: string;

  delete() {
    return new Promise(async (res, rej) => {
      try {
        const query = `DELETE FROM ${this.table} ${this.params}`;
        delete this.params;
        await execute(query);
        res(true);
      } catch (error) {
        rej(error);
      }
    });
  }
}
