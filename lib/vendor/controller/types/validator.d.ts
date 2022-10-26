export type Rules =
  | "required"
  | "email"
  | "min:?"
  | `min:${number}`
  | `confirmation:${string}`
  | Function;

export interface Rule {
  [field: string]: Rules[];
}
