import { isFontSrc } from './isFontSrc'
import type { FontFace } from '../types/FontFace'

/**
 * Typeguard for whether a value is a FontFace
 */
export const isFontFace = (obj: any): obj is FontFace | never => {
  if (!('fontFamily' in obj) || typeof obj.fontFamily !== 'string') {
    throw new Error(`

Expected value of type FontFace, which requires a fontFamily property of type string.
Received ${obj}

    `)
  }

  if (!('src' in obj)) {
    throw new Error(`
    
Expected value of type FontFace, which requires a src property of type FontSrc[]
Received ${obj}
    
    `)
  }

  try {
    return obj.src.every((srcObj: any) => isFontSrc(srcObj))
  } catch (error) {
    throw error
  }
}
