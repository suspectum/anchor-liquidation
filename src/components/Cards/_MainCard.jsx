import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider } from '@mui/material';

//================================|| CUSTOM MAIN CARD ||================================//

export const MainCard = forwardRef(({ border = true, children, content = true, contentClass, sx = {}, title, ...otherProps }, ref) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Card
      ref={ref}
      {...otherProps}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
        ...sx,
      }}
    >
      {/* card header */}
      {title && <CardHeader title={title} />}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && <CardContent sx={{ ...contentClass }}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
});
