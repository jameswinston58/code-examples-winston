export type ResponsiveType = Array<number> | { [k: string]: number } | number | null | string;

type ResponsiveFunction = (property: ResponsiveType) => ResponsiveType;

export interface FormatResponsive {
  property?: ResponsiveType,
  format: ResponsiveFunction
}

export const formatResponsiveProperty = (
  property: ResponsiveType,
  format: ResponsiveFunction
): ResponsiveType => {
  if (Array.isArray(property)) {
    const propertyArray = []
    property.forEach(
      // eslint-disable-next-line no-return-assign
      (element, i) => propertyArray[i] = format(element)
    )
    return propertyArray
  }

  if (typeof property === 'object' && property !== null) {
    const guttarObject = {}
    for (const key in property) {
      guttarObject[key] = format(property[key])
    }
    return property
  }

  if (typeof property === 'number') {
    return format(property)
  }
}
