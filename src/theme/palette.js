import { blue, deepPurple, red, amber, deepOrange, green, grey } from '@mui/material/colors';

export function themePalette(customization) {
  const { themeMode } = customization;

  return {
    mode: themeMode,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    primary: {
      ...{
        light: blue[50],
        200: blue[200],
        main: blue[500],
        dark: blue[600],
        800: blue[800],
      },
    },
    secondary: {
      ...{
        light: themeMode === 'dark' ? deepPurple[100] : deepPurple[50],
        200: themeMode === 'dark' ? deepPurple[200] : deepPurple[200],
        main: themeMode === 'dark' ? deepPurple['A200'] : deepPurple[500],
        dark: themeMode === 'dark' ? deepPurple['A400'] : deepPurple[600],
        800: themeMode === 'dark' ? deepPurple['A700'] : deepPurple[800],
      },
    },
    error: {
      ...{
        light: red[200],
        main: red[500],
        dark: red[800],
      },
    },
    warning: {
      ...{
        light: amber[50],
        main: amber['A100'],
        dark: amber[500],
      },
    },
    orange: {
      light: deepOrange[50],
      main: deepOrange[200],
      dark: deepOrange[800],
    },
    success: {
      ...{
        light: green['A100'],
        200: green['A200'],
        main: green['A400'],
        dark: green['A700'],
      },
    },
    dark: {
      light: themeMode === 'dark' ? '#bdc8f0' : grey[700],
      main: '#29314f',
      dark: '#212946',
      800: '#1a223f',
      900: '#111936',
    },
    grey: {
      ...{
        50: grey[50],
        100: grey[100],
        200: grey[200],
        300: grey[300],
        400: grey[400],
        500: themeMode === 'dark' ? '#8492c4' : grey[500],
        600: themeMode === 'dark' ? '#d7dcec' : grey[900],
        700: themeMode === 'dark' ? '#bdc8f0' : grey[700],
        900: themeMode === 'dark' ? '#bdc8f0' : grey[900],
      },
    },
    text: {
      ...{
        primary: themeMode === 'dark' ? '#bdc8f0' : grey[700],
        secondary: themeMode === 'dark' ? '#8492c4' : grey[500],
        dark: themeMode === 'dark' ? '#bdc8f0' : grey[900],
        hint: grey[100],
      },
    },
    background: {
      paper: themeMode === 'dark' ? '#212946' : '#ffffff',
      default: themeMode === 'dark' ? '#111936' : '#ffffff',
    },
  };
}
