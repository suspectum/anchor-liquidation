// material-ui
import { styled } from '@mui/material/styles';
import { Toolbar, Typography, IconButton } from '@mui/material';

// project imports
import { MoreMenu } from '../MoreMenu';
//================================|| STYLED COMPONENTS ||================================//

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const MyBidsToolbar = ({ selected, collateral_token, userBids }) => {
  const numSelected = selected.length;

  return (
    <StyledToolbar>
      {numSelected > 0 && (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      )}

      {numSelected > 0 && (
        <IconButton>
          <MoreMenu bid_idx={selected} collateral_token={collateral_token} userBids={userBids} />
        </IconButton>
      )}
    </StyledToolbar>
  );
};
