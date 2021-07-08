const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json')).toString())

pkg.type = 'module'

writeFileSync(join(__dirname, '../package.json'), JSON.stringify(pkg, null, 2))
