import { useState } from "react";
import { sum1 } from "./math";
import { slug } from "./string";

export * from "./math";
export * from "./string";

export function describe(values: number[]): string {
  return `${slug("total value")}=${sum1(...values)}`;
}

export function useCounter() {
  const [count, setCount] = useState(0);
  return { count, inc: () => setCount(count + 1) };
}
