export const execute = async function (query: string) {
  const { default: pdo } = require("../../connection");
  const db = new pdo();
  return await db.query(query);
};
