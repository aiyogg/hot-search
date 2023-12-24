/**
 * From: https://github.com/zolplay-cn/core/blob/main/packages/utils/src/helpers.ts
 */

import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge classes with tailwind-merge with clsx full feature */
export function clsxm(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}