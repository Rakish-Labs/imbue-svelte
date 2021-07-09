const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const pkg = JSON.parse(readFileSync(join(__dirname, '../package/package.json')))

/** Remove .js extension from exports */
const processed = Object.keys(pkg.exports).reduce((acc, current) => {
	if (current.endsWith('.js')) {
		acc[current.replace('.js', '')] = pkg.exports[current]
	} else {
		acc[current] = pkg.exports[current]
	}

	return acc
}, {})

writeFileSync(join(__dirname, '../package/package.json'), JSON.stringify(processed, null, 2))
