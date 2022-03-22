import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#5A06AA',
  primaryDark: '#340363',
  primaryLight: '#AF5FFD',
  primaryLighter: '#D783FF',

  secondary: '#008D74',
  secondaryDark: '#005645',
  secondaryLight: '#53AE7D',

  white: '#eee',
  onDark: '#ddd',
  background: '#0a0a0a',
  gray: '#464646',
  darkGray: '#363636',
  lightGray: '#aaa',
  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparentBlack: 'rgba(0, 0, 0, 0.7)',
  error: '#c92222',
};

export const SIZES = {
  // global sizes
  xs: 5,
  s: 8,
  m: 12,
  l: 15,
  xl: 24,
  xxl: 35,
  xxxl: 52,

  // font sizes
  h1: 36,
  h2: 30,
  h3: 22,
  h4: 16,
  h5: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  h1: {
    fontFamily: 'Roboto_700Bold',
    fontSize: SIZES.h1,
    lineHeight: 41,
  },
  h2: {
    fontFamily: 'Roboto_700Bold',
    fontSize: SIZES.h2,
    lineHeight: 35,
  },
  h3: {
    fontFamily: 'Roboto_500Medium',
    fontSize: SIZES.h3,
    lineHeight: 27,
  },
  h4: {
    fontFamily: 'Roboto_500Medium',
    fontSize: SIZES.h4,
    lineHeight: 21,
  },
  h5: {
    fontFamily: 'Roboto_700Bold',
    fontSize: SIZES.h5,
    lineHeight: 19,
  },

  body1: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body1,
    lineHeight: 34,
  },
  body2: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body2,
    lineHeight: 24,
  },
  body3: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body3,
    lineHeight: 20,
  },
  body4: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body4,
    lineHeight: 18,
  },
  body5: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body5,
    lineHeight: 16,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
