import { cssInJsToCss } from '../mdn/derived/cssInJsToCssMapper'
import type { CSSInJSProperties } from '../mdn/derived/CSSInJSProperties'

export const cssInJsToCssDeclarationString = (obj: CSSInJSProperties) =>
  Object.entries(obj).reduce((acc: string, [key, value]) => {
    acc += `${cssInJsToCss[key]}: ${value};\n`
    return acc
  }, '')
