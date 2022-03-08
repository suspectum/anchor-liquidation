export function themeTypography(themeOption) {
  const { palette, customization } = themeOption;
  const { themeMode, borderRadius, fontFamily } = customization;

  return {
    fontFamily: fontFamily,
    h6: {
      fontSize: '0.75rem',
      color: palette.grey[600],
      fontWeight: 500,
    },
    h5: {
      fontSize: '0.875rem',
      color: palette.grey[600],
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: palette.grey[600],
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      color: palette.grey[600],
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      color: palette.grey[600],
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      color: palette.grey[600],
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: themeMode === 'dark' ? palette.grey[600] : palette.text.dark,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: palette.text.secondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: palette.text.secondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: palette.text.primary,
    },
    customInput: {
      '& .MuiInputLabel-animated': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transition: '0.1s ease all',
      },

      '& .MuiOutlinedInput-root': {
        height: 'auto',
      },
      marginTop: 8,
      marginBottom: 8,
      '& > label': {
        top: '23px',
        left: 0,
        color: palette.grey[500],
        '&[data-shrink="false"]': {
          transform: 'translate(14px, 16px) scale(1)',
          transition: '0.1s ease all',
          top: '5px',
        },
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
      },
      '& legend': {
        display: 'none',
      },
      '& fieldset': {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: themeMode === 'dark' ? '#1a223f' : palette.primary.light,
      width: '100%',
      minHeight: 'calc(100vh - 80px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '80px',
      marginRight: '20px',
      borderRadius: `${borderRadius}px`,
    },
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: palette.grey[600],
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      color: palette.text.secondary,
      textTransform: 'capitalize',
    },
    commonIconButton: {
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '0',
    },
    smallIconButton: {
      width: '22px',
      height: '22px',
      fontSize: '1rem',
    },
    mediumIconButton: {
      width: '34px',
      height: '34px',
      fontSize: '1.25rem',
    },
    largeIconButton: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem',
    },
  };
}
