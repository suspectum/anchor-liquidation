import { useRef, useState } from 'react';

// material
import { Menu, MenuItem, ListItemIcon, ListItemText, Dialog, Button, TextField } from '@mui/material';

// icons
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';

// project imports
import { SubCard } from 'components';
import { useAnchorLiquidationContract } from 'hooks';

//================================|| MORE MENU ||================================//

export const MoreMenu = ({ bid_idx, collateral_token, userBids }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { retractBid, activateBids } = useAnchorLiquidationContract();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
    setIsOpen(false);
  };

  const handleRetractBid = async () => {
    // handleDialogToggle();
    retractBid(bid_idx);
    setIsOpen(false);
  };

  const handleActivatetBid = async () => {
    let arrBids;
    if (userBids) {
      arrBids = bid_idx.filter((el) => {
        return userBids.some((f) => {
          return f.wait_end !== null && el === f.idx;
        });
      });
    } else {
      arrBids = [bid_idx];
    }

    activateBids(arrBids, collateral_token);
    setIsOpen(false);
  };

  return (
    <>
      <Button ref={ref} onClick={handleToggle} variant="outlined">
        Manage
      </Button>

      <Dialog open={isDialogOpen} onClose={handleDialogToggle}>
        <SubCard title={'Create Transaction'} style={{ paddingBtoom: 0 }}>
          <TextField />
        </SubCard>
      </Dialog>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={handleToggle}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleActivatetBid}>
          <ListItemIcon>
            <FiEdit />
          </ListItemIcon>
          <ListItemText primary="Activate" />
        </MenuItem>

        <MenuItem onClick={handleRetractBid}>
          <ListItemIcon>
            <FiTrash />
          </ListItemIcon>
          <ListItemText primary="Retract" />
        </MenuItem>
      </Menu>
    </>
  );
};
