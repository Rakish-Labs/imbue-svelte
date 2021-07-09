<!--
  @component
  
  BackgroundColor is a mutually exclusive union of
  Hierarchy or Meaning; pass it either:
  ```
  {
    hierarchy: 
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'quaternary'
  }
  ```
  or:

  ```
  {
    meaning:
      | 'danger'
      | 'success'
      | 'warning'
  }
  ```
  in addition to its other properties.
-->
<script lang="ts">
	import { browser } from '$app/env'
	import { css } from '@emotion/css'
	import Color from 'color'
	import { themeGroup, prefersColorScheme, theme } from '../Theme/store'

	import DefaultLoader from './DefaultLoader.svelte'
	import { runtimeValidateProps } from './runtimeValidateProps'
	import { cssInJsToCssDeclarationString } from '../utility/cssInJsToCssDeclarationString'

	import type { ButtonProps, MeaningOptions, HierarchyOptions } from './types'
	import type { CSSInJSProperties } from '../mdn/derived/CSSInJSProperties'

	/** Define the prop types - Note: experimental API! */
	type $$Props = ButtonProps

	$: runtimeValidateProps($$props)

	/** Define default props */
	export let disabled = false
	export let loading = false
	export let Loader = undefined
	export let onClick = () => undefined
	export let width = 'auto'

	/** Convert CSSInJS to CSS for use in styles */
	$: [activeCSS, defaultCSS, disabledCSS, focusedCSS, hoveredCSS, loadingCSS] = [
		$theme.button.active,
		$theme.button.default,
		$theme.button.disabled,
		$theme.button.focused,
		$theme.button.hovered,
		$theme.button.loading,
	].map((themeObj: CSSInJSProperties) => cssInJsToCssDeclarationString(themeObj))

	/**
	 * Expose the value of mutually exclusive background color for use
	 * within the component; if not specified, default to 'primary'
	 */
	const backgroundColor: MeaningOptions | HierarchyOptions = (() => {
		if ('hierarchy' in $$props) return $$props.hierarchy
		if ('meaning' in $$props) return $$props.meaning
		return 'primary'
	})()

	let node
	let parentBackgroundColor
	$: {
		/** If not server-side and a reference to the Button node exists... */
		if (browser && node) {
			/** Keep a reference to the current node we're querying as we recurse up the DOM tree */
			let parentNode: Element
			/** Recursive function to check the background-color of the current element */
			const queryParentBackgroundColor = (node: Element) => {
				const backgroundColor = window.getComputedStyle(node).backgroundColor
				/** If transparent, it hasn't been set, go one higher... */
				if (backgroundColor === 'rgba(0, 0, 0, 0)') {
					parentNode = node.parentNode as Element

					/** Stop trying if we've traversed all the way up the tree */
					if (parentNode.nodeName !== 'HTML') {
						return queryParentBackgroundColor(parentNode)
					}

					/** Fallback to the theme's background value */
					return $theme.globals.palette.background.value
				}
				/** Otherwise, we've got our background-color! */
				return backgroundColor
			}
			/** Update the value for consumption by this component */
			parentBackgroundColor = queryParentBackgroundColor(node.parentNode as Element)
		}
	}

	const valueRGB = Color($theme.globals.palette[backgroundColor].value).rgb()
	const contrastRGB = Color($theme.globals.palette[backgroundColor].contrast).rgb()
	const parentRGB = Color(parentBackgroundColor).rgb()

	$: cssStyles = css`
		--background-color: ${Color($theme.globals.palette[backgroundColor].value).toString()};
		--background-color-rgb: ${valueRGB.red()}, ${valueRGB.green()}, ${valueRGB.blue()};

		--background-color-contrast: ${Color($theme.globals.palette[backgroundColor].contrast)
			.rgb()
			.toString()};
		--background-color-contrast-rgb: ${contrastRGB.red()}, ${contrastRGB.green()},
			${contrastRGB.blue()};

		--parent-background-color: ${parentBackgroundColor};
		--parent-background-color-rgb: ${parentRGB.red()}, ${parentRGB.green()}, ${parentRGB.blue()};

		background-color: var(--background-color);
		color: var(--background-color-contrast);

		width: ${width};

		${defaultCSS}

		&:hover {
			${hoveredCSS}
		}

		&:focus {
			${focusedCSS}
		}

		&:focus:hover {
			${hoveredCSS}
		}

		&:active,
		&:active:hover {
			${activeCSS}
		}

		&.loading {
			${loadingCSS}
		}

		&:disabled {
			${disabledCSS}
		}
	`
</script>

<button
	bind:this={node}
	class={cssStyles}
	class:loading
	disabled={disabled || loading}
	on:click={onClick}
>
	{#if loading}
		{#if Loader}
			<svelte:component this={Loader} />
		{:else}
			<DefaultLoader />
		{/if}
	{:else}
		<slot />
	{/if}
</button>
