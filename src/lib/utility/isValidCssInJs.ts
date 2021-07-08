import { validateDeclaration } from 'csstree-validator';
import { cssInJsToCss } from '../mdn/derived/cssInJsToCssMapper';
import type { CSSInJSProperties } from '../mdn/derived/CSSInJSProperties';

/**
 * Validates a value at a given CSSInJSProperties key
 */
export const isValidCssInJs = (propName: keyof CSSInJSProperties, value: string): boolean =>
	validateDeclaration(cssInJsToCss[propName], value).length === 0;
