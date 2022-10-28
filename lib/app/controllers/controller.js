const {
  default: DefaultController,
} = require("../../vendor/controller/default.controller");

class Controller extends DefaultController {
  applyMixins(baseClass, extendedClasses) {
    extendedClasses.forEach((extendedClass) => {
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

module.exports = Controller;
