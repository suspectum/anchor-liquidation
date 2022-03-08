import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// assets

// project imports
import { componentStyleOverrides } from './compStyleOverride';
import { themePalette } from './palette';
import { themeTypography } from './typography';

export function ThemeConfig({ children }) {
  const customization = useSelector((state) => state.customizationReducer);

  console.log(customization);

  const themeOption = useMemo(
    () => ({
      direction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px',
          },
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
      palette: themePalette(customization),
      customization: customization,
    }),
    [customization]
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...themeOption,
        components: componentStyleOverrides(themeOption),
        typography: themeTypography(themeOption),
      }),
    [themeOption]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
