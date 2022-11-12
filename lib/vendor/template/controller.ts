export const plainController = (controller_name: string) => {
  let t = 'import { Request, Response } from "express";';
  t += "\n";
  t += 'import Controller from "./controller";';
  t += "\n";
  t += "\n";
  t += `export default class ${controller_name} extends Controller {`;
  t += "\n";
  t += "//";
  t += "\n";
  t += "}";
  return t;
};

export const resourceController = (controller_name: string) => {
  return `import { Request, Response } from "express";
import Controller from "./controller";

export default class ${controller_name} extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @param req ExpressRequest
   * @param res ExpressResponse
   *
   * @return {void}
  */
  index({ req, res }: { req: Request; res: Response }): void {
    //
  }

  /**
   * Show the form for creating a new resource.
   *
   * @param req ExpressRequest
   * @param res ExpressResponse
   *
   * @return {void}
  */
  create({ req, res }: { req: Request; res: Response }): void {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param req ExpressRequest
   * @param res ExpressResponse
   *
   * @return {void}
  */
  store({ req, res }: { req: Request; res: Response }): void {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param id Number
   * @param req ExpressRequest
   * @param res ExpressResponse
   *
   * @return {void}
  */
  show({ id, req, res }: { id: Number; req: Request; res: Response }): void {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param id Number
   * @param req ExpressRequest
   * @param res ExpressResponse
   *
   * @return {void}
  */
  edit({ id, req, res }: { id: Number; req: Request; res: Response }): void {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param id Number
   * @param req ExpressRequest
   * @param res ExpressResponse
   *
   * @return {void}
  */
  update({ id, req, res }: { id: Number; req: Request; res: Response }): void {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param id Number
   * @param req ExpressRequest
   * @param res ExpressResponse
   *
   * @return {void}
  */
  destroy({ id, req, res }: { id: Number; req: Request; res: Response }): void {
    //
  }
}`;
};
