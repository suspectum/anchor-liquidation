import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';

// material-ui
import {
  Avatar,
  Stack,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  Checkbox,
} from '@mui/material';

// project imports
import { Pending } from '../Pending';
import { MainCard } from 'components';
import { MoreMenu } from '../MoreMenu';
import { demicrofy, _sort } from 'utils';
import { MyBidsHeader } from './MyBidsHeader';
import { MyBidsToolbar } from './MyBidsToolbar';
import { useAnchorLiquidationContract } from 'hooks';
import { FETCH_BIDS, SET_USER_BIDS } from 'constants';

//===========================|| MY BIDS ||===========================//

export const MyBids = () => {
  const { walletAddress } = useSelector((state) => state.terraReducer);
  const { collateralTokens, fetchBids, currentCollateralToken } = useSelector((state) => state.bidReducer);

  const dispatch = useDispatch();

  const { getBidsByUser } = useAnchorLiquidationContract();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [userBids, setUserBids] = useState([]);
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('premium_slot');
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  const tokenInfo = collateralTokens?.find(({ token }) => {
    return token === currentCollateralToken;
  });

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!walletAddress) return setUserBids();
    if (!fetchBids || !tokenInfo) return;

    const getUserBids = async () => {
      try {
        const { bids } = await getBidsByUser(currentCollateralToken);
        setUserBids(bids);
        dispatch({ type: FETCH_BIDS, payload: false });
        dispatch({ type: SET_USER_BIDS, payload: bids });
      } catch (error) {
        console.log(error);
      }
    };
    getUserBids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCollateralToken, fetchBids, tokenInfo, walletAddress]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sortedUserBids.map((n) => n.idx);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, idx) => {
    const selectedIndex = selected.indexOf(idx);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, idx);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => {
    return selected.indexOf(name) !== -1;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userBids.length) : 0;

  const sortedUserBids = _sort(userBids, order, orderBy);

  return (
    <MainCard title="My Bids" contentClass={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        {userBids && (
          <Paper sx={{ width: '100%', mb: 2 }}>
            <MyBidsToolbar selected={selected} collateral_token={tokenInfo?.token} userBids={userBids} />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
                <MyBidsHeader
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={sortedUserBids.length}
                />
                <TableBody>
                  {sortedUserBids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const isItemSelected = isSelected(row.idx);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.idx} selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={(event) => handleClick(event, row.idx)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>

                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          <Stack direction="row" width="100%" alignItems="center" spacing={2}>
                            <Grid item>
                              <Avatar src={tokenInfo?.icon} />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1" noWrap>
                                {tokenInfo?.symbol}
                              </Typography>
                              <Typography variant="subtitle2" noWrap>
                                {`Bonded ${tokenInfo?.symbol.substring(1)} `}
                              </Typography>
                            </Grid>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{row.premium_slot}%</TableCell>

                        <TableCell align="left">
                          <Stack direction="row" width="100%" alignItems="center" spacing={2}>
                            <Grid item>
                              <Typography variant="subtitle2">
                                <NumberFormat
                                  thousandsGroupStyle="thousand"
                                  value={demicrofy(row.amount).toString()}
                                  decimalSeparator="."
                                  displayType="text"
                                  type="text"
                                  thousandSeparator={true}
                                  allowNegative={true}
                                  decimalScale={3}
                                  fixedDecimalScale={true}
                                  prefix="$"
                                  suffix=" remained"
                                />
                              </Typography>

                              <Typography variant="subtitle2" noWrap>
                                <NumberFormat
                                  thousandsGroupStyle="thousand"
                                  value={demicrofy(row.pending_liquidated_collateral).toString()}
                                  decimalSeparator="."
                                  displayType="text"
                                  type="text"
                                  thousandSeparator={true}
                                  allowNegative={false}
                                  // decimalScale={6}
                                  fixedDecimalScale={true}
                                  suffix={` ${tokenInfo?.symbol} to claim`}
                                />
                              </Typography>
                            </Grid>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          {row.wait_end === null ? (
                            'Active'
                          ) : now > row.wait_end ? (
                            'Ready for activation'
                          ) : (
                            <Pending timestamp={row.wait_end} />
                          )}
                        </TableCell>
                        <TableCell align="left">
                          <MoreMenu bid_idx={row.idx} collateral_token={row.collateral_token} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 33 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedUserBids.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Box>
    </MainCard>
  );
};
