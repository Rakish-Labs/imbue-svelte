import * as css from 'csstree-validator'

/**
 * Validates a CSS property
 *
 * @param cssProperty
 * @param value
 * @returns boolean
 */
export const is = (cssProperty: string, value: string): boolean | never => {
	return css.validateDeclaration(cssProperty, value).length === 0
}
