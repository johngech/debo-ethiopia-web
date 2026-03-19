import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge tailwind classes safely
export const mergeClassName = (...inputs: ClassValue[]) =>
  twMerge(clsx(inputs));
