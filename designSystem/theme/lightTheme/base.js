import {
  black,
  white,
  blue,
  green,
  red,
  yellow,
  purple,
  teal,
  blackfades,
  categoryData
} from '../primitives/color'
import {
  fontSizes as primitiveFontSizes,
  fontWeights as fontWeightPrimitives
} from '../primitives/typography'

// light is actually the default text color
// dark is good for stuff like headers

export const themeColors = {
  black,
  white,
  blue,
  green,
  red,
  yellow,
  purple,
  teal,
  ...blackfades,
  brand: {
    primary: teal['500'],
    secondary: blue['500'],
    power: purple['500']
  },
  semantic: {
    success: green['500'],
    error: red['500'],
    warning: yellow['500'],
    link: blue['500'],
    info: teal['900']
  },
  text: {
    ultraDark: black,
    dark: black,
    base: blackfades.blackfade70,
    light: blackfades.blackfade50,
    ultraLight: blackfades.blackfade30
  },
  bg: {
    base: white,
    secondary: '#F7F7F7', // don't know where to stick this.
    secondaryLight: blackfades.blackfade10,
    secondaryMediumLight: blackfades.blackfade5,
    secondaryUltraLight: blackfades.blackfade2,
    callout: white
  },
  border: {
    ultraDark: black,
    dark: blackfades.blackfade50,
    base: blackfades.blackfade20,
    light: blackfades.blackfade10
  },
  categoricalData: categoryData,
  chartBorder: white,
  chartThroughLine: blackfades.blackfade30,
  chartInterventionMarker: blackfades.blackfade20,
  chartGridLine: blackfades.blackfade5
}

export const radii = [0, '3px', '6px']

export const radiiDefault = radii[2]

export const borderWidths = [0, '1px']

export const fontFamily =
  "'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif"

export const fontSizes = {
  ...primitiveFontSizes,
  default: primitiveFontSizes[2],
  forceStrong: [0, 1] // reference primitiveFontSizes index 2. Anything under this is medium
}

export const fontWeights = {
  ...fontWeightPrimitives,
  strong: fontWeightPrimitives.medium // this makes semantic sense in some components.
}
