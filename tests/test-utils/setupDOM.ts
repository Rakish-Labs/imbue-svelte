import { fake, replace } from 'sinon'

/**
 * This module shims unimplemented DOM APIs from JSDOM that
 * the library uses, such as sessionStorage (implemented in,
 * JSDOM but requires an origin, which is unconfigurable when
 * using global-jsdom/register), or matchMedia.
 *
 * Because tests run in parallel and in random order, this
 * file needs to be imported by any test suites whose test
 * subjects consume these APIs.
 */

/**
 * Override JSDOM's sessionStorage, which requires an origin (can't
 * be configured with global-jsdom/register)
 */
Object.defineProperty(window, 'sessionStorage', {
	writable: true,
	value: {
		getItem: () => undefined,
		setItem: () => undefined
	}
})

/**
 * Define window.matchMedia, which is unimplemented by JSDOM
 */
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => {
		return {
			matches: false,
			media: query,
			onchange: null,
			addListener: () => undefined, // deprecated
			removeListener: () => undefined, // deprecated
			addEventListener: () => undefined,
			removeEventListener: () => undefined,
			dispatchEvent: () => undefined
		}
	}
})

/**
 * Export spies and return values
 */

/**
 * Replace window.sessionStorage.getItem's return value
 *
 * Usage:
 *
 * ```
 * // Take care to restore after a test replaces `getItem`
 * suite.after.each(() => sinon.restore())
 *
 * ...
 *
 * // After running this, calls in the tested code to getItem will return 'my return value'
 * sessionStorageGetItemSpy('my return value')
 * ```
 *
 * @param returnValue
 * @returns
 */
export const sessionStorageGetItemMock = (returnValue: string): (() => string) =>
	replace(window.sessionStorage, 'getItem', fake.returns(returnValue))

export const matchMediaReturnValue = {
	matches: false,
	media: null,
	onchange: null,
	addListener: (): void => undefined, // deprecated
	removeListener: (): void => undefined, // deprecated
	addEventListener: (): void => undefined,
	removeEventListener: (): void => undefined,
	dispatchEvent: (): void => undefined
}

/**
 * Replace window.matchMedia's return value
 *
 * Usage:
 *
 * ```
 * // Import the stubbed return value, if you only care about mocking one property (i.e., window.matchMedia(...).matches)
 * import { matchMediaMock, matchMediaReturnValue } from '../path/to/test-utils/setupDOM'
 *
 * // Take care to restore after a test replaces `getItem`
 * suite.after.each(() => sinon.restore())
 *
 * ...
 *
 * // Spread in the return value, mocking only what you care to mock; in this case, we care about testing the condition wherein the media query matches the queried value
 * matchMediaMock({ ...matchMediaReturnValue, matches: true })
 *
 * // Subsequent calls to window.matchMedia in the code will return { matches: true, ...rest }
 *
 * ```
 *
 * @param returnValue
 * @returns
 */
export const matchMediaMock = (
	returnValue: typeof matchMediaReturnValue
): (() => typeof matchMediaReturnValue) => replace(window, 'matchMedia', fake.returns(returnValue))
