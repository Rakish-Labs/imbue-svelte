import { lightThemeGlobals } from '../_config/defaultLightThemeGlobals'
import type { ButtonTheme } from './types'
import type { CSSInJSProperties } from '../mdn/derived/CSSInJSProperties'

const defaultCss: CSSInJSProperties = {
	alignItems: 'center',
	border: '2px solid var(--background-color)',
	borderRadius: lightThemeGlobals.borderRadius,
	boxShadow: lightThemeGlobals.boxShadows.none,
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
}

const hovered: CSSInJSProperties = {
	transition: 'box-shadow 0.4s',
	boxShadow: '1px 2px 6px 0 rgba(var(--background-color-rgb), .5)',
}

const focused: CSSInJSProperties = {
	transition: 'box-shadow 0.4s, border 0.4s',
	boxShadow: `
    0 0 0 6px var(--parent-background-color),
    0 0 0 8px var(--background-color-contrast)`,
}

const active: CSSInJSProperties = {
	boxShadow: lightThemeGlobals.boxShadows.none,
	transition: 'box-shadow 0.1s',
}

const disabled: CSSInJSProperties = {
	boxShadow: lightThemeGlobals.boxShadows.none,
	cursor: 'not-allowed',
	backgroundColor: lightThemeGlobals.palette.disabled.value,
	color: lightThemeGlobals.palette.disabled.contrast,
	border: `1px solid ${lightThemeGlobals.palette.disabled.value}`,
}

const loading: CSSInJSProperties = {
	display: 'flex',
	justifyContent: 'center',
	padding: '3px 32px',
}

export const lightTheme: ButtonTheme = {
	default: defaultCss,
	hovered,
	focused,
	active,
	disabled,
	loading,
}
