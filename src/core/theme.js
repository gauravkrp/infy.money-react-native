import { DefaultTheme, configureFonts } from 'react-native-paper';
// console.log(DefaultTheme.colors)
// {
//   "accent": "#03dac4",
//   "backdrop": "rgba(0, 0, 0, 0.5)",
//   "background": "#f6f6f6",
//   "disabled": "rgba(0, 0, 0, 0.26)",
//   "error": "#B00020",
//   "notification": "#f50057",
//   "onSurface": "#000000",
//   "placeholder": "rgba(0, 0, 0, 0.54)",
//   "primary": "#6200ee",
//   "surface": "#ffffff",
//   "text": "#000000",
// }

// Dosis_200ExtraLight,
// Dosis_300Light,
// Dosis_400Regular,
// Dosis_500Medium,
// Dosis_600SemiBold,
// Dosis_700Bold,
// Dosis_800ExtraBold

const fonts = {
  thin: {
    fontFamily: 'thin',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'light',
    fontWeight: 'normal',
  },
  regular: {
    fontFamily: 'regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'medium',
    fontWeight: 'normal',
  },
  semiBold: {
    fontFamily: 'semiBold',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'bold',
    fontWeight: 'normal',
  },
  extraBold: {
    fontFamily: 'extraBold',
    fontWeight: 'normal',
  },
}

const fontConfig = {
  web: {
    ...fonts,
  },
  ios: {
    ...fonts,
  },
  android: {
    ...fonts,
  },
  default: fonts
};


export const theme = {
  ...DefaultTheme,
  roundness: 2,
  // fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    text: '#1C162E',
    textLight: '#c8c8c8',
    textGrey: '#696969',
    black: '#000000',
    primary: '#9D70FF',
    secondary: '#414757',
    background: '#ffffff',
    white: '#ffffff',
    surface: '#ffffff',
    lightWhite: '#f0f0f0',
    green: '#1AD5AD',
    success: '#1AD5AD',
    error: '#f13a59',
    red: '#f13a59',
    funds: '#9D70FF',
    stocks: '#E83F94',
    mutual_funds: '#FFD035',
    bank_accounts: '#1AD5AD',
    deposits: '#24CDD8',
    bonds: '#F2F2F2',
    others: '#1C162E',
  },
}
