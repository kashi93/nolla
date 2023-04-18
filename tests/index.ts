import chalk from "chalk";
export default (async () => {
  const list = require("./unit_list.json");
  let pass = 0;
  let fail = 0;

  console.log("\n");

  for await (const l of list) {
    try {
      const { default: unit } = require(`./units/${l}`);
      const cb = await unit.handler();
      console.log(chalk.blue(l), chalk.green(`PASS`));

      if (cb != undefined) {
        console.log(cb);
      }

      pass++;
    } catch (error) {
      console.log(chalk.blue(l), chalk.red("FAIL"));
      console.log(error.message);
      fail++;
    }
  }

  console.log("\n");

  console.log(
    "Status ",
    chalk.green(`PASS : ${pass}`),
    "/",
    chalk.red(`FAIL : ${fail}`)
  );

  console.log("\n");
  process.exit();
})();
