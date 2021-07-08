<script lang="ts">
	import { onMount } from 'svelte'
	import { serializeStyles } from '@emotion/serialize'
	import { StyleSheet } from '@emotion/sheet'
	import { serialize, compile, middleware, rulesheet, stringify } from 'stylis'
	import { theme, prefersColorScheme } from './store'

	onMount(() => {
		if (typeof window !== 'undefined') {
			/** Add an event listener to change the theme based on user preference */
			window
				?.matchMedia('(prefers-color-scheme: dark)')
				.addEventListener('change', (event: MediaQueryListEvent) => {
					prefersColorScheme.set(event.matches ? 'darkTheme' : 'lightTheme')
				})
		}
	})

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
    body {
      background-color: ${$theme.globals.palette.background.value};
    }
  `)
	}

	$: console.log({ theme: $theme })
</script>

<!-- Reset styles -->
<svelte:head>
	<link rel="stylesheet" href="reset.css" />
</svelte:head>

<slot />
