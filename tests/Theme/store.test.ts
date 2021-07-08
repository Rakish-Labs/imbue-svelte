import '../test-utils/setupDOM'

import { suite } from 'uvu'
import assert from 'uvu/assert'
import {
	matchMediaReturnValue,
	matchMediaMock,
	sessionStorageGetItemMock,
} from '../test-utils/setupDOM'
import sinon from 'sinon'

import { get } from 'svelte/store'

import {
	prefersColorScheme,
	computeInitialColorScheme,
	themeGroup,
	theme,
} from '../../src/lib/Theme/store'

const themeStore = suite('Theme store')
themeStore.after.each(() => sinon.restore())

const fixture = {
	lightTheme: {
		globals: {
			fontFaces: [
				{
					fontFamily: 'system',
					src: [
						{ local: '-apple-system' },
						{ local: 'BlinkMacSystemFont' },
						{ local: 'avenir next' },
						{ local: 'avenir' },
						{ local: 'helvetica neue' },
						{ local: 'helvetica' },
						{ local: 'Ubuntu' },
						{ local: 'roboto' },
						{ local: 'noto' },
						{ local: 'segoe ui' },
						{ local: 'arial' },
					],
				},
				{
					fontFamily: 'system-mono',
					src: [
						{ local: 'SF Mono Regular' },
						{ local: 'Menlo' },
						{ local: 'Andale Mono' },
						{ local: 'Monaco' },
						{ local: 'Consolas' },
						{ local: 'Liberation Mono' },
						{ local: 'Courier' },
					],
				},
			],
			borderRadius: '8px',
			boxShadows: {
				none: '0 0 0 0 rgba(0, 0, 0, 0)',
				noneInset: 'inset 0 0 0 0 rgba(0, 0, 0, 0)',
				default: '1px 2px 6px 0 #CEE5F2',
				defaultInset: 'inset 1px 2px 6px 0 #CEE5F2',
				pronounced: '1px 3px 10px 0 #CEE5F2',
				pronouncedInset: 'inset 1px 3px 7px 0px #CEE5F2',
			},
			palette: {
				primary: { value: '#63B2EC', contrast: '#264258' },
				secondary: { value: '#B184F9', contrast: '#3A2C53' },
				tertiary: { contrast: '#407499', value: '#EAF5FC' },
				quaternary: { contrast: '#7859A7', value: '#ECE6F4' },
				danger: { value: '#F05d5e', contrast: '#441A1B' },
				warning: { value: '#FADB4D', contrast: '#6E6023' },
				success: { value: '#48BF84', contrast: '#1B4731' },
				disabled: { value: '#DFDFDF', contrast: '#FFFFFA' },
				background: { value: '#FFFFFA', contrast: '#37393A' },
				panelBackground: { value: '#F6FAFD', contrast: '#4C5867' },
			},
		},
		button: {
			default: {
				alignItems: 'center',
				border: '2px solid var(--background-color)',
				borderRadius: '8px',
				boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
				display: 'flex',
				cursor: 'pointer',
				fontFamily: 'system, sans-serif',
				fontSize: '14px',
				fontStyle: 'normal',
				fontWeight: '500',
				height: '36px',
				justifyContent: 'center',
				letterSpacing: '2px',
				padding: '0 22px',
				textTransform: 'uppercase',
				transition: 'box-shadow 0.1s, border 0.1s',
				outline: '0',
			},
			hovered: {
				transition: 'box-shadow 0.4s',
				boxShadow: '1px 2px 6px 0 rgba(var(--background-color-rgb), .5)',
			},
			focused: {
				transition: 'box-shadow 0.4s, border 0.4s',
				boxShadow:
					'\n    0 0 0 6px var(--parent-background-color),\n    0 0 0 8px var(--background-color-contrast)',
			},
			active: { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)', transition: 'box-shadow 0.1s' },
			disabled: {
				boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
				cursor: 'not-allowed',
				backgroundColor: '#DFDFDF',
				color: '#FFFFFA',
				border: '1px solid #DFDFDF',
			},
			loading: { display: 'flex', justifyContent: 'center', padding: '3px 32px' },
		},
	},
	darkTheme: {
		globals: {
			fontFaces: [
				{
					fontFamily: 'system',
					src: [
						{ local: '-apple-system' },
						{ local: 'BlinkMacSystemFont' },
						{ local: 'avenir next' },
						{ local: 'avenir' },
						{ local: 'helvetica neue' },
						{ local: 'helvetica' },
						{ local: 'Ubuntu' },
						{ local: 'roboto' },
						{ local: 'noto' },
						{ local: 'segoe ui' },
						{ local: 'arial' },
					],
				},
				{
					fontFamily: 'system-mono',
					src: [
						{ local: 'SF Mono Regular' },
						{ local: 'Menlo' },
						{ local: 'Andale Mono' },
						{ local: 'Monaco' },
						{ local: 'Consolas' },
						{ local: 'Liberation Mono' },
						{ local: 'Courier' },
					],
				},
			],
			borderRadius: '8px',
			boxShadows: {
				none: '0 0 0 0 rgba(0, 0, 0, 0)',
				noneInset: 'inset 0 0 0 0 rgba(0, 0, 0, 0)',
				default: '1px 2px 6px 0 #CEE5F2',
				defaultInset: 'inset 1px 2px 6px 0 #CEE5F2',
				pronounced: '1px 3px 10px 0 #CEE5F2',
				pronouncedInset: 'inset 1px 3px 7px 0 #CEE5F2',
			},
			palette: {
				primary: { value: '#63B2EC', contrast: '#264258' },
				secondary: { value: '#B184F9', contrast: '#3A2C53' },
				tertiary: { contrast: '#407499', value: '#EAF5FC' },
				quaternary: { contrast: '#7859A7', value: '#ECE6F4' },
				danger: { value: '#F05d5e', contrast: '#441A1B' },
				warning: { value: '#FADB4D', contrast: '#6E6023' },
				success: { value: '#48BF84', contrast: '#1B4731' },
				disabled: { value: '#57595A', contrast: '#37393A' },
				background: { value: '#3C4043', contrast: '#FFFFFA' },
				panelBackground: { value: '#35363A', contrast: '#FFFFFA' },
			},
		},
		button: {
			default: {
				alignItems: 'center',
				border: '2px solid var(--background-color)',
				borderRadius: '8px',
				boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
				display: 'flex',
				cursor: 'pointer',
				fontFamily: 'system, sans-serif',
				fontSize: '14px',
				fontStyle: 'normal',
				fontWeight: '500',
				height: '36px',
				justifyContent: 'center',
				letterSpacing: '2px',
				padding: '0 22px',
				textTransform: 'uppercase',
				transition: 'box-shadow 0.1s, border 0.1s',
				outline: '0',
			},
			hovered: {
				transition: 'box-shadow 0.4s',
				boxShadow: '1px 2px 6px 0 rgba(var(--background-color-rgb), .5)',
			},
			focused: {
				transition: 'box-shadow 0.4s, border 0.4s',
				boxShadow:
					'\n    0 0 0 6px var(--parent-background-color),\n    0 0 0 8px var(--background-color)',
			},
			active: { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)', transition: 'box-shadow 0.1s' },
			disabled: {
				boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
				cursor: 'not-allowed',
				backgroundColor: '#57595A',
				color: '#37393A',
				border: '1px solid #57595A',
			},
			loading: { display: 'flex', justifyContent: 'center', padding: '3px 32px' },
		},
	},
}

themeStore(
	'derives themeGroup from light and dark themes of all components to match the fixture; if not, likely new components have been added',
	() => {
		assert.equal(themeGroup, fixture)
	},
)

/**
 * Assumes no SessionStorage value has been set
 */
themeStore(
	'prefersColorScheme is "lightTheme" when "(prefers-color-scheme: dark)" is false',
	async () => {
		const expected = 'lightTheme'

		matchMediaMock({ ...matchMediaReturnValue, matches: false })
		prefersColorScheme.set(computeInitialColorScheme())

		const actual = get(prefersColorScheme)
		assert.is(actual, expected)

		/** Expect the correct theme object to be derived */
		assert.equal(get(theme), fixture.lightTheme)
	},
)

/**
 * Assumes no SessionStorage value has been set
 */
themeStore(
	'prefersColorScheme is "darkTheme" when "(prefers-color-scheme: dark)" is true',
	async () => {
		const expected = 'darkTheme'

		matchMediaMock({ ...matchMediaReturnValue, matches: true })
		prefersColorScheme.set(computeInitialColorScheme())

		const actual = get(prefersColorScheme)
		assert.is(actual, expected)

		/** Expect the correct theme object to be derived */
		assert.equal(get(theme), fixture.darkTheme)
	},
)

themeStore(
	'prefersColorScheme is "lightTheme" when user preference in sessionStorage is "lightTheme"',
	() => {
		const expected = 'lightTheme'

		sessionStorageGetItemMock(expected)
		prefersColorScheme.set(computeInitialColorScheme())

		const actual = get(prefersColorScheme)
		assert.is(actual, expected)

		/** Expect the correct theme object to be derived */
		assert.equal(get(theme), fixture.lightTheme)
	},
)

themeStore(
	'prefersColorScheme is "darkTheme" when user preference in sessionStorage is "darkTheme"',
	() => {
		const expected = 'darkTheme'

		sessionStorageGetItemMock(expected)
		prefersColorScheme.set(computeInitialColorScheme())

		const actual = get(prefersColorScheme)
		assert.is(actual, expected)

		/** Expect the correct theme object to be derived */
		assert.equal(get(theme), fixture.darkTheme)
	},
)

themeStore.run()
