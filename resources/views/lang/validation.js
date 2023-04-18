exports.default = {
  required: "The :attribute field is required.",
  email: "The :attribute must be a valid email address.",
  min: {
    numeric: "The :attribute must be at least :min.",
    file: "The :attribute must be at least :min kilobytes.",
    string: "The :attribute must be at least :min characters.",
    array: "The :attribute must have at least :min items.",
  },
  confirmation: "The :attribute confirmation does not match.",
  mimes: "The :attribute must be a file of type: :values.",
  max: {
    numeric: "The :attribute must not be greater than :max.",
    file: "The :attribute must not be greater than :max kilobytes.",
    string: "The :attribute must not be greater than :max characters.",
    array: "The :attribute must not have more than :max items.",
  },
};
