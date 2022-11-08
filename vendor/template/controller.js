"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceController = exports.plainController = void 0;
var plainController = function (controller_name) {
    var t = 'import { Request, Response } from "express";';
    t += "\n";
    t += 'import Controller from "./controller";';
    t += "\n";
    t += "\n";
    t += "export default class ".concat(controller_name, " extends Controller {");
    t += "\n";
    t += "//";
    t += "\n";
    t += "}";
    return t;
};
exports.plainController = plainController;
var resourceController = function (controller_name) {
    return "import { Request, Response } from \"express\";\nimport Controller from \"./controller\";\n  \nexport default class ".concat(controller_name, " extends Controller {\n  /**\n   * Display a listing of the resource.\n   *\n   * @param req ExpressRequest\n   * @param res ExpressResponse\n   *\n   * @return {void}\n  */\n  index({ req, res }: { req: Request; res: Response }): void {\n    //\n  }\n  \n  /**\n   * Show the form for creating a new resource.\n   *\n   * @param req ExpressRequest\n   * @param res ExpressResponse\n   *\n   * @return {void}\n  */\n  create({ req, res }: { req: Request; res: Response }): void {\n    //\n  }\n  \n  /**\n   * Store a newly created resource in storage.\n   *\n   * @param req ExpressRequest\n   * @param res ExpressResponse\n   *\n   * @return {void}\n  */\n  store({ req, res }: { req: Request; res: Response }): void {\n    //\n  }\n  \n  /**\n   * Display the specified resource.\n   *\n   * @param id Number\n   * @param req ExpressRequest\n   * @param res ExpressResponse\n   *\n   * @return {void}\n  */\n  show({ id, req, res }: { id: Number; req: Request; res: Response }): void {\n    //\n  }\n  \n  /**\n   * Show the form for editing the specified resource.\n   *\n   * @param id Number\n   * @param req ExpressRequest\n   * @param res ExpressResponse\n   *\n   * @return {void}\n  */\n  edit({ id, req, res }: { id: Number; req: Request; res: Response }): void {\n    //\n  }\n  \n  /**\n   * Update the specified resource in storage.\n   *\n   * @param id Number\n   * @param req ExpressRequest\n   * @param res ExpressResponse\n   *\n   * @return {void}\n  */\n  update({ id, req, res }: { id: Number; req: Request; res: Response }): void {\n    //\n  }\n  \n  /**\n   * Update the specified resource in storage.\n   *\n   * @param id Number\n   * @param req ExpressRequest\n   * @param res ExpressResponse\n   *\n   * @return {void}\n  */\n  destroy({ id, req, res }: { id: Number; req: Request; res: Response }): void {\n    //\n  }\n}");
};
exports.resourceController = resourceController;
