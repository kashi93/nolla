export type Rules = "required" | "email" | `min:${number}`;

export interface Rule {
  [field: string]: Rules[];
}
