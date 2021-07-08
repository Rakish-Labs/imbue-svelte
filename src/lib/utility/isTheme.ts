import { isThemeGlobals } from './isThemeGlobals'
import type { Theme } from '../types/Theme'

/**
 * Typeguard for validating theme objects loaded either
 * from a user-defined theme.json file hosted in their
 * project, or loaded over their network.
 *
 * @param obj
 */
export const isTheme = (obj: any): obj is Theme | never => {
  if (!('globals' in obj)) {
    throw new Error(`
    
Expected object of type Theme, which requires a \`globals\`
property; the theme object that was passed is missing theme.globals.
Received: ${obj}
    
    `)
  } else {
    isThemeGlobals(obj.globals)
  }

  return true
}
