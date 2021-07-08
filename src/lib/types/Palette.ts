export type PaletteColor = {
  value: string
  contrast: string
}

/**
 * Limit the global palette to:
 *
 * 1) Hierarchical colors (primary, secondary, tertiary, quaternary)
 * 2) Semantic colors (colors with meaning in the application, i.e., danger, success, warning)
 * 3) Disabled state colors
 * 4) Background colors (where `value` refers to the page's background)
 * 5) Panel background colors (where `value` refers to the background color of panels used to
 *    differentiate parts of an app against the page's background)
 *
 * Each of these colors comes with a `value` prop to define the actual color, as well as a
 * per-`value` customizable `contrast` value, so that an accessible foreground color may be
 * chosen for each specified `value`.
 */
export type Palette = {
  primary: PaletteColor
  secondary: PaletteColor
  tertiary: PaletteColor
  quaternary: PaletteColor

  danger: PaletteColor
  success: PaletteColor
  warning: PaletteColor

  disabled: PaletteColor

  background: PaletteColor
  panelBackground: PaletteColor
}
