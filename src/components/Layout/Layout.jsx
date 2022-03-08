import { useMemo } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// project imports
import { Wallet } from './Header/Wallet';

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  width: '100%',
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Grow = styled('div')(() => ({
  flexGrow: 1,
}));

export const Layout = ({ children }) => {
  const memoizedWallet = useMemo(() => <Wallet />, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <Grow />
          {memoizedWallet}
        </Toolbar>
      </AppBar>

      <Main>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};
