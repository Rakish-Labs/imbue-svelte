import { darkThemeGlobals } from '../_config/defaultDarkThemeGlobals'
import type { CSSInJSProperties } from '../mdn/derived/CSSInJSProperties'
import type { ButtonTheme } from './types'

const defaultCss: CSSInJSProperties = {
	alignItems: 'center',
	border: '2px solid var(--background-color)',
	borderRadius: darkThemeGlobals.borderRadius,
	boxShadow: darkThemeGlobals.boxShadows.none,
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
    0 0 0 8px var(--background-color)`,
}

const active: CSSInJSProperties = {
	boxShadow: darkThemeGlobals.boxShadows.none,
	transition: 'box-shadow 0.1s',
}

const disabled: CSSInJSProperties = {
	boxShadow: darkThemeGlobals.boxShadows.none,
	cursor: 'not-allowed',
	backgroundColor: darkThemeGlobals.palette.disabled.value,
	color: darkThemeGlobals.palette.disabled.contrast,
	border: `1px solid ${darkThemeGlobals.palette.disabled.value}`,
}

const loading: CSSInJSProperties = {
	display: 'flex',
	justifyContent: 'center',
	padding: '3px 32px',
}

export const darkTheme: ButtonTheme = {
	default: defaultCss,
	hovered,
	focused,
	active,
	disabled,
	loading,
}
