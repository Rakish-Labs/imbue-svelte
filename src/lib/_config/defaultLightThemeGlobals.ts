import { animatableNone, animatableNoneInset } from './boxShadowAnimatableNone'
import type { ThemeGlobals } from '../types/ThemeGlobals'

export const lightThemeGlobals: ThemeGlobals = {
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
		none: animatableNone,
		noneInset: animatableNoneInset,
		default: '1px 2px 6px 0 #CEE5F2',
		defaultInset: 'inset 1px 2px 6px 0 #CEE5F2',
		pronounced: '1px 3px 10px 0 #CEE5F2',
		pronouncedInset: 'inset 1px 3px 7px 0px #CEE5F2',
	},
	palette: {
		/**
		 * Hierarchy
		 */
		primary: {
			value: '#63B2EC',
			contrast: '#264258',
		},
		secondary: {
			value: '#B184F9',
			contrast: '#3A2C53',
		},
		tertiary: {
			contrast: '#407499',
			value: '#EAF5FC',
		},
		quaternary: {
			contrast: '#7859A7',
			value: '#ECE6F4',
		},

		/**
		 * Meaning
		 */
		danger: {
			value: '#F05d5e',
			contrast: '#441A1B',
		},
		warning: {
			value: '#FADB4D',
			contrast: '#6E6023',
		},
		success: {
			value: '#48BF84',
			contrast: '#1B4731',
		},

		disabled: {
			value: '#DFDFDF',
			contrast: '#FFFFFA',
		},
		background: {
			value: '#FFFFFA',
			contrast: '#37393A',
		},
		panelBackground: {
			value: '#F6FAFD',
			contrast: '#4C5867',
		},
	},
}
