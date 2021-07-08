import type { GlobalCssKeyword } from '../types/GlobalCssKeyword'

/**
 * Typeguard for validating that a literal matches the
 * GlobalCssKeyword type:
 *
 * ```
 * 'initial' | 'inherit' | 'unset'
 * ```
 *
 * @param obj
 */
export const isGlobalCSSKeyword = (
  value: any,
): value is GlobalCssKeyword | never => {
  if (
    value === 'initial' ||
    value === 'inherit' ||
    value === 'unset' ||
    value === 'revert'
  ) {
    return true
  }

  throw new Error(`

Expected literal 'initial' | 'inherit' | 'unset' for GlobalCssKeyword.
Received: ${value}
  
  `)
}
