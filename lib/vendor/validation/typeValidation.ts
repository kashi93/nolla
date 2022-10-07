const ValidationRules = [
  "required",
  "email",
  `min:${[]}`,
  `confirm:${[]}`,
] as const;

type ValidationRules = typeof ValidationRules[keyof typeof ValidationRules];

export default interface ValidationType {
  [key: string]: Array<ValidationRules>;
}
