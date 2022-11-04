import fs from "fs";
import { Request, File } from "../../";
export default class RequestDefault {
  [key: string]: any;

  generateRequest(req: Request): void {
    request = req;
    req.input = this.input;
    req.file = this.file;
  }

  input(field: string) {
    const val = this.body[field] || this.query[field];
    if (val != null) {
      if (String(val).trim().length < 1) {
        return null;
      }
    }

    return val;
  }

  file(field: string): File | null {
    const files: any[] = this.files;
    if (files != null) {
      const fil = files.filter((f) => f.fieldname == field);
      if (fil.length > 0) {
        return {
          fieldname: fil[0].fieldname,
          originalname: fil[0].originalname,
          encoding: fil[0].encoding,
          mimetype: fil[0].mimetype,
          destination: fil[0].destination,
          filename: fil[0].filename,
          path: fil[0].path,
          size: fil[0].size,
          async move(publicPath: string = "", name: string = null) {
            const file_arr = this.originalname.split("."),
              file_ext = file_arr[file_arr.length - 1],
              dir = public_path(publicPath);
            let fileName = String(Date.now());

            if (name != null) {
              fileName = name;
            }

            fileName + `.${file_ext}`;

            await fs.promises.mkdir(dir, {
              recursive: true,
            });

            await fs.promises.rename(this.path, `${dir}/${fileName}`);

            return `${dir}/${fileName}`.replace(`${process.cwd()}/public`, "");
          },
        };
      }
    }

    return null;
  }
}
