import type { FontSrc } from '../types/FontFace'

/**
 * Typeguard for whether a value is a FontSrc
 */
export const isFontSrc = (obj: any): obj is FontSrc | never => {
  if (!('local' in obj) || typeof obj.local !== 'string') {
    throw new Error(`

Expected object of type FontSrc, which requires a \`local\` property of type string.
Received ${obj}
    
    `)
  }

  if (obj.downloadedUrl && typeof obj.downloadedUrl !== 'string') {
    throw new Error(`
    
Expected object of type FontSrc, whose optional \`downloadedUrl\` property must be
of type string. Received ${obj}
    
    `)
  }

  if (obj.selfHostedUrl && typeof obj.selfHostedUrl !== 'string') {
    throw new Error(`
    
Expected object of type FontSrc, whose optional \`selfHostedUrl\` property must be
of type string. Received ${obj}
  
    `)
  }

  return true
}
