import { kebabCase, truncate } from "lodash";

export function slug(value: string): string {
  return kebabCase(value);
}

export function short(value: string, length: 24): string {
  return truncate(value, { length });
}
