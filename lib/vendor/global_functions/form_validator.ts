var errors: any[];
var message: string | null;
var errorHas: (field: string) => boolean;
var clearFormValidationSession: () => void;

export const thisIsAModule = true;

declare global {
  var errors: any[];
  var message: string | null;
  var errorHas: (field: string) => boolean;
  var clearFormValidationSession: () => void;
}

globalThis.errors = [];
globalThis.message = "";
globalThis.errorHas = (field: string): boolean => {
  const err = global.errors.filter((e) => e.param == field);
  if (err.length > 0) {
    global.message = err[0].msg;
    return true;
  }
  return false;
};
globalThis.clearFormValidationSession = () => {
  setTimeout(() => {
    global.errors = [];
    global.message = "";
  }, 300);
};
