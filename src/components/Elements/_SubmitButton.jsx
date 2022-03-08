// material-ui
import { Box, Button } from '@mui/material';

// project imports
import { Spinner } from './_Spinner';

//===========================|| SUBMIT BUTTON ||===========================//

export const SubmitButton = ({
  isSubmitting,
  text,
  color = 'secondary',
  size = 'large',
  variant = 'contained',
  fullWidth = true,
  ...otherProps
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', mt: 2, width: fullWidth ? '100%' : 'inherit' }}>
        <Button
          disableElevation
          disabled={isSubmitting}
          fullWidth={fullWidth}
          size={size}
          type="submit"
          variant={variant}
          color={color}
          {...otherProps}
        >
          {text}
        </Button>
        {isSubmitting && (
          <Spinner size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
        )}
      </Box>
    </Box>
  );
};
