// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

//================================|| SUB CARD ||================================//

export const SubCard = ({ children, title, secondary, ...otherProps }) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Card
      sx={{
        padding: 0,
        border: '1px solid',
        borderColor: mode === 'dark' ? theme.palette.dark.light + 15 : theme.palette.primary.light,
        ':hover': {
          boxShadow: mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)',
        },
      }}
      {...otherProps}
    >
      {/* card header and action */}
      {title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{title}</Typography>} action={secondary} />}
      {/* content & header divider */}
      {title && (
        <Divider
          sx={{
            opacity: 1,
            borderColor: mode === 'dark' ? theme.palette.dark.light + 15 : theme.palette.primary.light,
          }}
        />
      )}
      {/* card content */}
      <CardContent sx={{ p: 2.5 }}>{children}</CardContent>
    </Card>
  );
};
