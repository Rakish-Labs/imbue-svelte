/**
 * An invisible box-shadow to enable CSS transitions
 * between an element with no apparent shadow to one with
 * a visible shadow, as opposed to 'none'.
 *
 * Translates to:
 *
 * ```
 *  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0)
 * ```
 */
export const animatableNone: string = '0 0 0 0 rgba(0, 0, 0, 0)'

/**
 * An invisible inset box-shadow to enable CSS transitions
 * between an element with no apparent shadow to one with
 * a visible shadow, as opposed to 'none'.
 *
 * Translates to:
 *
 * ```
 *  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0)
 * ```
 */
export const animatableNoneInset: string = 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
