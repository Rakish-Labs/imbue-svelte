const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const { execSync } = require('child_process')

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json')).toString())

pkg.type = 'commonjs'

writeFileSync(join(__dirname, '../package.json'), JSON.stringify(pkg, null, 2))
