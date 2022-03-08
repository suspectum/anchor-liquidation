// material-ui
import { visuallyHidden } from '@mui/utils';
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox, Box } from '@mui/material';

const headCells = [
  { id: 'collateral_token', label: 'Collateral', alignRight: false, disablePadding: true },
  { id: 'premium_slot', label: 'Premium', alignRight: false },
  { id: 'amount', label: 'Bid Info', alignRight: false },
  { id: 'wait_end', label: 'Bid Status', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },
];

export const MyBidsHeader = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
