export interface FontSrc {
  local: string
  downloadedUrl?: string
  selfHostedUrl?: string
}

/**
 * Imbue dynamically generates @font-face at-rules based on what is provided
 * to the theme's `fontFaces` array. Its src property is a list of FontSrc
 * objects specifying from where the font can be retrieved at runtime, prioritized
 * in the order FontSrc objects are provided.
 */
export interface FontFace {
  /**
   * The reference name for the font-family to be used as font-family
   * style values. For example, if 'Roboto' is placed here, you would
   * specify a font-family rule like `font-family: Roboto;` in CSS.
   */
  fontFamily: string

  /**
   * An array of FontSrc objects, in order of family priority, specifying
   * a `local` font name (i.e., 'roboto'), a `selfHosted` url path, and
   * an (optional) fallback downloadable copy. Imbue dynamically generates
   * an @font-face at-rule
   *
   * @font-face {
   *    font-family: Roboto;
   *    src:
   *      url('path/to/public/fonts/roboto.woff'),
   *      // ... Additional self-hosted relative font url values
   *
   *      local('roboto'),
   *      // ... Additional local font values
   *
   *      url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap')`),
   *      // ... Additional downloaded url values
   *      ;
   * }
   *
   * `
   */
  src: FontSrc[]
}
