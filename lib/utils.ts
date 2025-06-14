import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safe number utilities to prevent NaN
export const safeNumber = (value: any, fallback = 0): number => {
  if (value === null || value === undefined || value === "") return fallback
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? fallback : num
}

export const safeString = (value: any, fallback = ""): string => {
  if (value === null || value === undefined) return fallback
  const str = String(value)
  return str === "NaN" || str === "undefined" || str === "null" ? fallback : str
}

export const formatNumber = (value: any, fallback = "0"): string => {
  const num = safeNumber(value, 0)
  return num.toLocaleString()
}

export const formatPercentage = (value: any, fallback = "0%"): string => {
  const num = safeNumber(value, 0)
  return `${Math.round(num)}%`
}

export const safeDivision = (numerator: any, denominator: any, fallback = 0): number => {
  const num = safeNumber(numerator, 0)
  const den = safeNumber(denominator, 1)
  if (den === 0) return fallback
  const result = num / den
  return isNaN(result) || !isFinite(result) ? fallback : result
}
