import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { darkTheme } from '../../src/lib/Button/darkTheme'
import { isValidCssInJs } from '../../src/lib/utility/isValidCssInJs'
import type { CSSInJSProperties } from '../../src/lib/mdn/derived/CSSInJSProperties'

const buttonDarkTheme = suite('Button Dark Theme')

buttonDarkTheme('it has a default property whose values are all valid CSS values', () => {
	Object.keys(darkTheme.default).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, darkTheme.default[key]), true)
	})
})

buttonDarkTheme('it has a hovered property whose values are all valid CSS values', () => {
	Object.keys(darkTheme.hovered).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, darkTheme.hovered[key]), true)
	})
})

buttonDarkTheme('has an active property whose values are all valid CSS values', () => {
	Object.keys(darkTheme.active).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, darkTheme.active[key]), true)
	})
})

buttonDarkTheme('has a focused property whose values are all valid CSS values', () => {
	Object.keys(darkTheme.focused).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, darkTheme.focused[key]), true)
	})
})

buttonDarkTheme('has a loading property whose values are all valid CSS values', () => {
	Object.keys(darkTheme.loading).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, darkTheme.loading[key]), true)
	})
})

buttonDarkTheme('has a disabled property values are all valid CSS values', () => {
	Object.keys(darkTheme.disabled).forEach((key: string) => {
		assert.is(isValidCssInJs(key as keyof CSSInJSProperties, darkTheme.disabled[key]), true)
	})
})

buttonDarkTheme.run()
