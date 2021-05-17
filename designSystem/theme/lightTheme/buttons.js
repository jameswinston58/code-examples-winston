import { darken, lighten } from 'polished'
import { fontSizes, fontWeights, themeColors as colors } from './base'

export default {
  fontWeights: {
    default: fontWeights.regular,
    strong: fontWeights.medium
  },
  selected: {
    // a custom style used in tabs
    default: {
      bg: colors.bg.secondaryLight,
      color: colors.black,
      border: colors.bg.secondaryLight
    },
    hover: {
      bg: colors.bg.secondaryLight,
      color: colors.black,
      border: colors.bg.secondaryLight
    },
    active: {
      bg: colors.bg.secondaryLight,
      color: colors.black,
      border: colors.bg.secondaryLight
    },
    focused: {
      bg: colors.bg.secondaryLight,
      color: colors.black,
      border: colors.bg.secondaryLight,
      boxShadow: '0 0 0 0.125em rgb(0 0 0 / 25%)'
    },
    disabled: {
      bg: colors.bg.secondaryLight,
      color: colors.black,
      border: colors.bg.secondaryLight
    }
  },
  sizes: {
    small: {
      fontSize: fontSizes[2], // need this
      padding: '12px',
      height: '30px'
    },
    normal: {
      fontSize: fontSizes[2],
      padding: '12px',
      height: '36px'
    },
    medium: {
      fontSize: fontSizes[2], // need this
      padding: '12px'
    },
    large: {
      fontSize: fontSizes[4],
      padding: '18px',
      height: '48px'
    }
  },
  colors: {
    default: {
      default: {
        bg: colors.white,
        color: colors.text.base,
        border: colors.border.base,
        link: colors.black
      },
      hover: {
        bg: colors.bg.secondary,
        color: colors.black,
        border: colors.border.base
      },
      active: {
        bg: colors.white,
        color: colors.blackfade70,
        border: colors.blackfade70
      },
      focused: {
        bg: colors.white,
        color: colors.blackfade70,
        border: colors.blackfade30,
        boxShadow: '0 0 0 0.125em rgb(0 0 0 / 25%)'
      },
      disabled: {
        bg: colors.white,
        color: colors.blackfade50,
        border: colors.blackfade10,
        link: colors.black
      }
    },
    // success Button
    primary: {
      default: {
        bg: colors.blue['500'],
        color: colors.white,
        border: colors.blue['500'],
        link: colors.blue['500']
      },
      hover: {
        bg: darken(0.05, colors.blue['500']),
        color: colors.white,
        border: darken(0.05, colors.blue['500'])
      },
      active: {
        bg: darken(0.05, colors.blue['500']),
        color: colors.white,
        border: darken(0.05, colors.blue['500'])
      },
      focused: {
        bg: colors.blue['500'],
        color: colors.white,
        border: colors.blue['500'],
        boxShadow: '0 0 0 0.125em rgb(0 0 0 / 25%)'
      },
      disabled: {
        bg: lighten(0.75, colors.blue['500']),
        color: colors.white,
        border: lighten(0.75, colors.blue['500']),
        link: lighten(0.75, colors.blue['500'])
      }
    }
  }
}
