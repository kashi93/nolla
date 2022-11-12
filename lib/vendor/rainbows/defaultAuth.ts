import { default as userModel } from "../../app/models/user.model";
import Validator from "../controller/validator";
import hash from "./hash";
import jwt from "jsonwebtoken";

class DefaultAuth {
  index?() {
    return view("nolla/pages/login/login");
  }

  async login?(req: any) {
    if (await this.validation(req)) {
      const user = await this.attempt();
      if (user) {
        this.generateSession(user);
        return response.redirect(this.redirectTo());
      } else {
        return response.redirect(route("login"));
      }
    }
  }

  async validation?(req: any) {
    const v = new Validator();
    return (
      (await v.validate(req, {
        email: ["required", "email"],
        password: ["required"],
      })) == true
    );
  }

  async attempt?(): Promise<any> {
    const user = await userModel
      .where("email", "=", request.input("email"))
      .first();

    if (user == null) {
      return false;
    }

    if (!(await hash.verify(request.input("password"), user.password))) {
      return false;
    }

    return user;
  }

  generateSession?(user: { [key: string]: any }) {
    const token = jwt.sign({ user }, process.env.APP_KEY, {
      expiresIn: "1h",
    });

    response.cookie("jwt", token, {
      maxAge: 1 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
    });
  }

  redirectTo?() {
    return route("home");
  }

  user?() {
    if (request.cookies.jwt == null) {
      return null;
    }

    const decoded: any = jwt.verify(
      request.cookies.jwt || null,
      process.env.APP_KEY
    );

    return decoded.user;
  }

  logout?() {
    response.cookie("jwt", "", {
      maxAge: -1,
      secure: true,
      httpOnly: true,
    });

    return response.redirect(route("login"));
  }
}

export = DefaultAuth;
