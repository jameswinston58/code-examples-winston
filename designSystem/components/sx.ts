import css, { SystemStyleObject, CssFunctionReturnType } from '@styled-system/css'

/*
TODO:
 - Test for this prop on the components that have it.
 - This this prop on a simple div.
**/

export interface SxProp {
  sx?: SystemStyleObject;
}

const sx = (props: SxProp): CssFunctionReturnType => css(props.sx)

export default sx
