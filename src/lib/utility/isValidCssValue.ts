import { validateDeclaration } from 'csstree-validator'

export const isValidCssValue = (
  propertyName: string,
  allegedCssValue: string,
) => {
  return validateDeclaration(propertyName, allegedCssValue).length > 0
    ? false
    : true
}
