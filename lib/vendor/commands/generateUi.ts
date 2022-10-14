import yargs from "yargs";
import reactUiCommand from "../template/ui/react/command/reactUiCommand";

export default yargs.command({
  command: "generate:ui",
  describe:
    "Generate front-end scaffolding for the application preset type (bootstrap, vue, react)",
  builder: {
    type: {
      alias: "t",
      required: true,
      type: "string",
    },
  },
  async handler(argv) {
    switch (argv.type) {
      case "react":
        reactUiCommand.handle();
        break;
      default:
        break;
    }
  },
});
