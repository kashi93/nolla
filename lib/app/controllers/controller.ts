import { default as DefaultController } from "../../vendor/controller/default.controller";

class Controller extends DefaultController {
  applyMixins(baseClass: any, extendedClasses: any) {
    extendedClasses.forEach((extendedClass: any) => {
      Object.getOwnPropertyNames(extendedClass.prototype).forEach((name) => {
        Object.defineProperty(
          baseClass.prototype,
          name,
          Object.getOwnPropertyDescriptor(extendedClass.prototype, name) ||
            Object.create(null)
        );
      });
    });
  }
}

export = Controller;
