import ThemeProvider from './Theme/ThemeProvider.svelte'
import { prefersColorScheme, theme } from './Theme/store'

import type { PrefersColorScheme } from './Theme/store'
import type { Theme } from './types/Theme'
import type { ThemeGroup } from './types/ThemeGroup'

export { prefersColorScheme, theme }
export default ThemeProvider

export type { PrefersColorScheme, ThemeGroup, Theme }
