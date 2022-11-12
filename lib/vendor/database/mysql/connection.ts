import { createConnection, Connection } from "mysql";

class mysql {
  async open() {
    const c = await config("database.connections");
    return createConnection(c.mysql);
  }

  close(con: Connection) {
    con.end();
  }

  async query(query: string) {
    try {
      const con = await this.open();
      const r = await this.execute(con, query);
      this.close(con);
      return r;
    } catch (error) {
      throw new Error(error);
    }
  }

  execute<T>(con: Connection, query: string): Promise<T> {
    try {
      if (!con) throw new Error("mysql connection was not created");

      return new Promise<T>((resolve, reject) => {
        con.query(query, [], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    } catch (error) {
      console.error("[mysql.connector][execute][Error]: ", error);
      throw new Error("failed to execute MySQL query");
    }
  }
}

export default mysql;
