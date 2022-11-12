import yargs from "yargs";
import { plainController, resourceController } from "../template/controller";
import fs from "fs";

export default yargs.command({
  command: "make:controller",
  describe: "Create a new controller class",
  builder: {
    name: {
      alias: "n",
      describe: "Name of controller",
      demandOption: true,
      type: "string",
    },
    resource: {
      alias: "r",
      demandOption: false,
      describe: "Generate controller with resources app method",
      type: "boolean",
      default: false,
    },
  },
  async handler(argv) {
    let p = "app/controllers/";
    const dir: any[] = String(argv.name).split("/");
    const n = dir.pop();
    let c: any = null;

    if (!Number.isNaN(parseInt(String(argv.name)))) {
      console.log("Controller name invalid!");
      return;
    }

    if (dir.length > 0) {
      for (let index = 0; index < dir.length; index++) {
        p += dir[index];
        if (!fs.existsSync(p)) {
          await fs.promises.mkdir(p);
        }
        p += "/";
      }
    }

    if (fs.existsSync(`${p}${n}.ts`)) {
      console.log("Controller already exists!");
      return;
    }

    if (argv.resource) {
      c = resourceController(String(argv.name));
    } else {
      c = plainController(String(argv.name));
    }

    if (c != null) {
      await fs.promises.writeFile(`${p}${n}.ts`, c, "utf-8");
    }

    console.log("Controller successfully created");
  },
});
