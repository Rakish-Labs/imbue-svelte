<script lang="ts">
	import { onMount, beforeUpdate } from 'svelte'
	import { serializeStyles } from '@emotion/serialize'
	import { StyleSheet } from '@emotion/sheet'
	import { serialize, compile, middleware, rulesheet, stringify } from 'stylis'
	import {
		theme,
		themeGroup as themeGroupStore,
		defaultThemeGroup,
		prefersColorScheme,
	} from './store'

	import type { ThemeGroup } from '../types/ThemeGroup'

	export let themeGroup: ThemeGroup = defaultThemeGroup

	beforeUpdate(() => {
		/** Before the component is mounted to the DOM, write the passed theme to the store */
		themeGroupStore.set(themeGroup)
	})

	onMount(() => {
		/** Add an event listener to change the theme based on user preference */
		if (typeof window !== 'undefined') {
			window
				?.matchMedia('(prefers-color-scheme: dark)')
				.addEventListener('change', (event: MediaQueryListEvent) => {
					prefersColorScheme.set(event.matches ? 'darkTheme' : 'lightTheme')
				})
		}
	})

	/** https://github.com/emotion-js/emotion/issues/2131#issuecomment-732744875 */
	function injectGlobal(...args) {
		if (typeof document === 'undefined') return

		const { name, styles } = serializeStyles(...(args as [any, any]))
		const sheet = new StyleSheet({
			key: `global-${name}`,
			container: document.head,
		})
		const stylis = (styles) =>
			serialize(
				compile(styles),
				middleware([
					stringify,
					rulesheet((rule) => {
						sheet.insert(rule)
					}),
				]),
			)
		stylis(styles)
		return () => sheet.flush()
	}

	$: if ($theme) {
		injectGlobal(`
/* 
	http://meyerweb.com/eric/tools/css/reset/ 
	v2.0 | 20110126
	License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

body {
	background-color: ${$theme.globals.palette.background.value};
}
  `)
	}
</script>

<!-- Reset styles -->
<svelte:head>
	<link rel="stylesheet" href="reset.css" />
</svelte:head>

<slot />
