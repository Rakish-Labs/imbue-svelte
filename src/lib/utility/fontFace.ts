import type { FontFace, FontSrc } from '../types/FontFace'

/**
 *
 * @param fontFaces
 * @description Converts FontFace[] (i.e., in the theme) to
 * CSS @font-face at-rule
 */
export const getCSSForFontFaces = (fontFaces: FontFace[]) => {
  return fontFaces.reduce(
    (atRules: string, fontFace: FontFace, index: number, arr: FontFace[]) => {
      atRules += `@font-face {
        font-family: ${fontFace.fontFamily};
        src: ${generateSrc(fontFace.src)};
        -webkit-font-smoothing: antialiased;
        font-weight: normal;
        font-style: normal; 
      }${index === arr.length - 1 ? '' : '\n'}`

      return atRules
    },
    // Begin with an empty string
    '',
  )
}

const generateSrc = (fontSrcs: FontSrc[]) => {
  const selfHostedUrls: string[] = []
  const localFontNames: string[] = []
  const downloadedUrls: string[] = []

  fontSrcs.forEach((fontSrc: FontSrc) => {
    if (fontSrc.selfHostedUrl) {
      selfHostedUrls.push(`url(${fontSrc.selfHostedUrl})`)
    }

    localFontNames.push(`local(${fontSrc.local})`)

    if (fontSrc.downloadedUrl) {
      downloadedUrls.push(`url(${fontSrc.downloadedUrl})`)
    }
  })

  // Return the prioritized, formatted CSS string
  return [...selfHostedUrls, ...localFontNames, ...downloadedUrls].reduce(
    (src: string, fontDef: string, i: number, arr: string[]) => {
      // Add a semicolon to end the rule if it's the last, otherwise, comma-separate
      if (i === arr.length - 1) {
        src += `${fontDef}`
      } else {
        src += `${fontDef}, `
      }
      return src
    },
    '',
  )
}
