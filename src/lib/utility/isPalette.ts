import type { Palette } from '../types/Palette'
import { isPaletteColor } from './isPaletteColor'

const MissingPropException = (propName: string, obj: unknown): Error =>
  new Error(`

Expected object of type Palette, which requires property \`${propName}\` of type
PaletteColor. Received: ${obj}

`)

/**
 * Typeguard for validating Palette object
 */
export const isPalette = (obj: any): obj is Palette | never => {
  if (!('primary' in obj)) {
    throw MissingPropException('primary', obj)
  } else {
    isPaletteColor(obj.primary)
  }

  if (!('secondary' in obj)) {
    throw MissingPropException('secondary', obj)
  } else {
    isPaletteColor(obj.secondary)
  }

  if (!('tertiary' in obj)) {
    throw MissingPropException('tertiary', obj)
  } else {
    isPaletteColor(obj.tertiary)
  }

  if (!('quaternary' in obj)) {
    throw MissingPropException('quarternary', obj)
  } else {
    isPaletteColor(obj.quaternary)
  }

  if (!('danger' in obj)) {
    throw MissingPropException('danger', obj)
  } else {
    isPaletteColor(obj.danger)
  }

  if (!('success' in obj)) {
    throw MissingPropException('success', obj)
  } else {
    isPaletteColor(obj.success)
  }

  if (!('warning' in obj)) {
    throw MissingPropException('warning', obj)
  } else {
    isPaletteColor(obj.warning)
  }

  if (!('background' in obj)) {
    throw MissingPropException('background', obj)
  } else {
    isPaletteColor(obj.background)
  }

  if (!('panelBackground' in obj)) {
    throw MissingPropException('panelBackground', obj)
  } else {
    isPaletteColor(obj.panelBackground)
  }

  return true
}
