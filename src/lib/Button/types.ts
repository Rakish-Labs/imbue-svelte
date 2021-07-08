import type { SvelteComponentTyped } from 'svelte'
import type { CSSInJSProperties } from '../mdn/derived/CSSInJSProperties'

/**
 * Props
 */
export type HierarchyOptions = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

export type MeaningOptions = 'danger' | 'success' | 'warning'

export interface Hierarchy {
	hierarchy?: HierarchyOptions
	meaning?: never
}

export interface Meaning {
	meaning: MeaningOptions
	hierarchy?: never
}

export interface IsMonochrome {
	monochromeBoxShadow?: true
	monochromeBoxShadowOpacity?: number
}

export interface IsNotMonochrome {
	monochromeBoxShadow: false
	monochromeBoxShadowOpacity?: never
}

export type BackgroundColor = Hierarchy | Meaning
export type Monochromatic = IsMonochrome | IsNotMonochrome

export type ButtonTheme = {
	default: CSSInJSProperties
	hovered: CSSInJSProperties
	focused: CSSInJSProperties
	active: CSSInJSProperties
	loading: CSSInJSProperties
	disabled: CSSInJSProperties
}

export type ButtonProps = BackgroundColor & {
	disabled?: boolean
	loading?: boolean
	onClick?: () => void
	Loader?: new (...args: unknown[]) => SvelteComponentTyped
	width?: string
}
