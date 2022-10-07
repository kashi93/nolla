import { dateTime } from "./dateTime";

export const dataToMysqlValue = (val: any) => {
  if (val == null || val == undefined) {
    return "NULL";
  }

  if (dateTime(val) != null) {
    return `'${dateTime(val)}'`;
  } else {
    if (typeof val == "string") {
      return `'${val}'`;
    } else if (typeof val == "bigint" || typeof val == "number") {
      return val;
    } else if (typeof val == "boolean") {
      return Number(val);
    } else if (typeof val == "object") {
      return `'${JSON.stringify(val)}'`;
    } else {
      return `'${val}'`;
    }
  }
};
