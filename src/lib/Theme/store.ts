import { writable, derived, Writable, Readable } from 'svelte/store'
import type { ThemeGroup } from '../types/ThemeGroup'
import type { Theme } from '../types/Theme'
import { SessionStorageKeys } from '../types/SessionStorageKeys'

/** Globals */
import { darkThemeGlobals } from '../_config/defaultDarkThemeGlobals'
import { lightThemeGlobals } from '../_config/defaultLightThemeGlobals'

/** Constituent component themes */
import { darkTheme as buttonDarkTheme } from '../Button/darkTheme'
import { lightTheme as buttonLightTheme } from '../Button/lightTheme'

/**
 * Derive the theme object value from the combined themes for
 * each component
 */
const lightTheme: Theme = {
	globals: lightThemeGlobals,
	button: buttonLightTheme,
}

const darkTheme: Theme = {
	globals: darkThemeGlobals,
	button: buttonDarkTheme,
}

export type PrefersColorScheme = keyof ThemeGroup

export const themeGroup: ThemeGroup = {
	lightTheme,
	darkTheme,
}

export const computeInitialColorScheme = (): PrefersColorScheme => {
	if (typeof window === 'undefined') return 'lightTheme'

	// Prioritize session storage
	if (window.sessionStorage.getItem(SessionStorageKeys.PREFERS_COLOR_SCHEME)) {
		const storageValue = window.sessionStorage.getItem(SessionStorageKeys.PREFERS_COLOR_SCHEME)

		/** Prioritize sessionStorage value only if valid */
		if (storageValue === 'darkTheme' || storageValue === 'lightTheme') {
			return storageValue as PrefersColorScheme
		}
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? ('darkTheme' as const)
		: ('lightTheme' as const)
}

export const prefersColorScheme: Writable<PrefersColorScheme> = writable<PrefersColorScheme>(
	computeInitialColorScheme(),
)

export const theme: Readable<Theme> = derived(
	prefersColorScheme,
	($prefersColorScheme) => themeGroup[$prefersColorScheme],
)
