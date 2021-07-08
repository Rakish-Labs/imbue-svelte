import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { lightTheme } from '../../src/lib/Button/lightTheme'
import { isValidCssInJs } from '../../src/lib/utility/isValidCssInJs'
import type { CSSInJSProperties } from '../../src/lib/mdn/derived/CSSInJSProperties'

const buttonLightTheme = suite('Button Light Theme')

buttonLightTheme('it has a default property whose values are all valid CSS values', () => {
	Object.keys(lightTheme.default).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, lightTheme.default[key]), true)
	})
})

buttonLightTheme('it has a hovered property whose values are all valid CSS values', () => {
	Object.keys(lightTheme.hovered).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, lightTheme.hovered[key]), true)
	})
})

buttonLightTheme('it has a active property whose values are all valid CSS values', () => {
	Object.keys(lightTheme.active).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, lightTheme.active[key]), true)
	})
})

buttonLightTheme('it has a focused property whose values are all valid CSS values', () => {
	Object.keys(lightTheme.focused).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, lightTheme.focused[key]), true)
	})
})

buttonLightTheme('it has a loading property whose values are all valid CSS values', () => {
	Object.keys(lightTheme.loading).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, lightTheme.loading[key]), true)
	})
})

buttonLightTheme('it has a loading property whose values are all valid CSS values', () => {
	Object.keys(lightTheme.loading).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, lightTheme.loading[key]), true)
	})
})

buttonLightTheme.run()
