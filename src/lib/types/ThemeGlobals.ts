import type { FontFace } from './FontFace'
import type { GlobalBoxShadows } from './GlobalBoxShadows'
import type { Palette } from './Palette'

export interface ThemeGlobals {
  borderRadius: string
  boxShadows: GlobalBoxShadows
  fontFaces: FontFace[]
  palette: Palette
}
