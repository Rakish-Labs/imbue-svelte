import { is } from './is'
import type { GlobalBoxShadows } from '../types/GlobalBoxShadows'

const MissingPropException = (propName: string, obj: unknown): Error => {
  return new Error(`
  
Expected object of type GlobalBoxShadows, which requires a \`${propName}\`
property; the object that was passed is missing boxShadows.${propName}.
Received ${obj}

`)
}

const InvalidPropertyValueException = (
  propName: string,
  actualValue: unknown,
): Error => {
  return new Error(`
  
Expected object of type GlobalBoxShadows, but the \`${propName}\` property
was not a valid CSS box-shadow value.
Received ${actualValue}

  `)
}

/**
 * Typeguard for validating that an object is of type
 * GlobalBoxShadows
 */
export const isGlobalBoxShadows = (
  obj: any,
): obj is GlobalBoxShadows | never => {
  /**
   * GlobalBoxShadows.none
   */
  if (!('none' in obj)) {
    throw MissingPropException('none', obj)
  } else {
    if (!is('box-shadow', obj.none)) {
      throw InvalidPropertyValueException('none', obj.none)
    }
  }

  /**
   * GlobalBoxShadows.noneInset
   */
  if (!('noneInset' in obj)) {
    throw MissingPropException('noneInset', obj)
  } else {
    if (!is('box-shadow', obj.noneInset)) {
      throw InvalidPropertyValueException('noneInset', obj.noneInset)
    }
  }

  /**
   * GlobalBoxShadows.default
   */
  if (!('default' in obj)) {
    throw MissingPropException('default', obj)
  } else {
    if (!is('box-shadow', obj.default)) {
      throw InvalidPropertyValueException('default', obj.default)
    }
  }

  /**
   * GlobalBoxShadows.defaultInset
   */
  if (!('defaultInset' in obj)) {
    throw MissingPropException('defaultInset', obj)
  } else {
    if (!is('box-shadow', obj.defaultInset)) {
      throw InvalidPropertyValueException('defaultInset', obj.defaultInset)
    }
  }

  /**
   * GlobalBoxShadows.pronounced
   */
  if (!('pronounced' in obj)) {
    throw MissingPropException('pronounced', obj)
  } else {
    if (!is('box-shadow', obj.pronounced)) {
      throw InvalidPropertyValueException('pronounced', obj.pronounced)
    }
  }

  /**
   * GlobalBoxShadows.pronouncedInset
   */
  if (!('pronouncedInset' in obj)) {
    throw MissingPropException('pronouncedInset', obj)
  } else {
    if (!is('box-shadow', obj.pronouncedInset)) {
      throw InvalidPropertyValueException(
        'pronouncedInset',
        obj.pronouncedInset,
      )
    }
  }

  return true
}
