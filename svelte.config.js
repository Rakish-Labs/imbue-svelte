import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess()],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		package: {
			dir: 'pkg',
			exports: {
				include: ['Button.ts', 'Theme.ts'],
			},
		},
	},
}

export default config
