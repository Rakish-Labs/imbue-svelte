const { writeFileSync, existsSync, mkdirSync, readFileSync } = require('fs')
const { join } = require('path')
const { sync: rimrafSync } = require('rimraf')

;(async () => {
	const path = join(__dirname, '../src/lib/mdn/derived')

	if (existsSync(path)) {
		console.log('Cleaning out src/lib/mdn/derived...')
		rimrafSync(path)

		console.log('Writing src/lib/mdn/derived...')
		mkdirSync(path)
	} else {
		console.log('Writing src/lib/mdn/derived...')
		mkdirSync(path)
	}

	console.log('Reading MDN properties.json from src/lib/mdn/properties.json')
	const properties = JSON.parse(
		readFileSync(join(__dirname, '../src/lib/mdn/properties.json')).toString()
	)

	console.log('Writing derived cssToCssInJS mapper')
	const cssToCssInJs = Object.keys(properties).reduce((acc, prop) => {
		let isVendorPrefixed = false
		let isMs = false

		if (prop === '--*') return acc
		if (prop.startsWith('-')) isVendorPrefixed = true
		if (prop.startsWith('-ms')) isMs = true

		const formatted = prop
			/** Remove - from property name */
			.split('-')
			/** If vendor-prefixed, filter out the empty string first index created by the '-' prefix */
			.filter((char) => (isVendorPrefixed ? char !== '' : true))
			/** Leave first token lower case, and capitalize all subsequent tokens */
			.map((token, index) => {
				if (index === 0 && (isMs || !isVendorPrefixed)) return token
				return `${token.charAt(0).toUpperCase()}${token.substring(1)}`
			})
			.join('')

		acc[prop] = formatted

		return acc
	}, {})

	writeFileSync(
		join(__dirname, '../src/lib/mdn/derived/cssToCssInJsMapper.ts'),
		`
import type { CSSProperties } from './CSSProperties'

export const cssToCssInJs: CSSProperties = ${JSON.stringify(cssToCssInJs, null, 2)}
`
	)

	/**
	 * Derive the inverse mapper
	 */
	const cssInJsToCss = Object.keys(cssToCssInJs).reduce((acc, prop) => {
		acc[cssToCssInJs[prop]] = prop
		return acc
	}, {})

	console.log('Writing derived cssInJsToCss')

	writeFileSync(
		join(__dirname, '../src/lib/mdn/derived/cssInJsToCssMapper.ts'),
		`
import type { CSSInJSProperties } from './CSSInJSProperties'

export const cssInJsToCss: CSSInJSProperties = ${JSON.stringify(cssInJsToCss, null, 2)}
  `
	)

	/**
	 * Derive types
	 */
	const CSSInJSProperties = Object.keys(cssInJsToCss).reduce((acc, prop) => {
		acc += `\n\t${prop}?: string`
		return acc
	}, '')

	writeFileSync(
		join(__dirname, '../src/lib/mdn/derived/CSSInJSProperties.ts'),
		`
export interface CSSInJSProperties {
[key: string]: string | undefined
${CSSInJSProperties}}
  `
	)

	const CSSProperties = Object.keys(cssToCssInJs).reduce((acc, prop) => {
		acc += `\n\t${prop.includes('-') ? `'${prop}'` : prop}?: string`
		return acc
	}, '')

	writeFileSync(
		join(__dirname, '../src/lib/mdn/derived/CSSProperties.ts'),
		`
export interface CSSProperties {
[key: string]: string | undefined
${CSSProperties}}
  `
	)
})()
