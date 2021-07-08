import { isFontFace } from './isFontFace'
import { isGlobalBoxShadows } from './isGlobalBoxShadows'
import { isPalette } from './isPalette'
import { is } from './is'
import type { ThemeGlobals } from '../types/ThemeGlobals'

const MissingPropException = (propName: string, obj: unknown): Error =>
  new Error(`

Expected object of type ThemeGlobals, which requires a \`${propName}\`
property; the object that was passed is missing globals.${propName}.
Received ${obj}

`)

/**
 * Typeguard for validating theme.globals from a theme
 * loaded either from a user-defined theme.json file
 * hosted in their project, or loaded over their network.
 *
 * @param obj
 */
export const isThemeGlobals = (obj: any): obj is ThemeGlobals | never => {
  if (!('borderRadius' in obj)) {
    throw MissingPropException('borderRadius', obj)
  } else {
    if (!is('border-radius', obj.borderRadius)) throw new Error()
  }

  if (!('boxShadows' in obj)) {
    throw MissingPropException('boxShadows', obj)
  } else {
    isGlobalBoxShadows(obj.boxShadows)
  }

  let exception: Error | undefined
  if (!('fontFaces' in obj)) {
    throw MissingPropException('fontFaces', obj)
  } else {
    if (!Array.isArray(obj.fontFaces))
      throw new Error(`
    
Expected object of type ThemeGlobals, but value of property \`fontFaces\`
was not an array. Expected FontFace[].
Received: ${obj.fontFaces}

`)
    /** Find the first invalid FontFace value */
    const invalid = obj.fontFaces.find((fontFace: any) => {
      try {
        if (isFontFace(fontFace)) return false
        return true
      } catch (error) {
        exception = error
        return true
      }
    })

    if (invalid)
      throw new Error(`
    
Expected object of type ThemeGlobals, but value of property \`fontFaces\`
was invalid. Expected FontFace[].
Received: ${invalid}

${
  exception !== undefined
    ? `Original error:
${exception.message}`
    : ''
}
    
    `)
  }

  if (!('palette' in obj)) {
    throw MissingPropException('palette', obj)
  } else {
    isPalette(obj.palette)
  }

  return true
}
