import { is } from './is'
import type { PaletteColor } from '../types/Palette'

const MissingPropException = (propName: string, obj: unknown) =>
  new Error(`

Expected object of type PaletteColor, which requires a \`${propName}\` property.
Received ${obj}

`)

const InvalidPropertyValueException = (
  propName: string,
  value: unknown,
): Error =>
  new Error(`

Expected a valid CSS color value for PaletteColor.${propName}, such as a hexadecimal, RGB(A), HSL(A), or named color value.
Recived ${value}.

`)

/**
 * Typeguard for validating PaletteColor
 */
export const isPaletteColor = (obj: any): obj is PaletteColor | never => {
  if (!('value' in obj)) {
    throw MissingPropException('value', obj)
  } else {
    if (!is('color', obj.value)) {
      throw InvalidPropertyValueException('value', obj.value)
    }
  }

  if (!('contrast' in obj)) {
    throw MissingPropException('contrast', obj)
  } else {
    if (!is('color', obj.contrast)) {
      throw InvalidPropertyValueException('contast', obj.contrast)
    }
  }

  return true
}
