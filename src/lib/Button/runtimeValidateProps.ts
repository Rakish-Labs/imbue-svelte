import { is } from '../utility/is'
import type { ButtonProps } from './types'

export const runtimeValidateProps = ($$props: ButtonProps): void | never => {
	/** Runtime validation for non TypeScript environments */
	if ('hierarchy' in $$props && 'meaning' in $$props) {
		throw new Error(`
[@imbuejs/svelte/Button]

Both a hierarchy and a meaning prop were specified on a Button, when only one may
be specified.
  `)
	}

	if ('width' in $$props && !is('width', $$props.width)) {
		throw new Error(`
[@imbuejs/svelte/Button]

A width prop was specified on a Button, but its value was not valid CSS.

Received ${$$props.width}

Provide a valid CSS value for width, or remove the prop for a width of 'auto'.
    `)
	}
}
