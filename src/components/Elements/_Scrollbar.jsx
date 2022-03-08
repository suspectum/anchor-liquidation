import SimpleBarReact from 'simplebar-react';

// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

//================================|| STYLED COMPONENTS ||================================//

const RootStyle = styled('div')({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: theme.palette.grey[500],
      right: 0,
    },
    '&.simplebar-visible:before': {
      opacity: 0.6,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 8,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

//================================|| SCROLLBAR ||================================//

export function Scrollbar({ children, sx, ...otherProps }) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...otherProps}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...otherProps}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}
