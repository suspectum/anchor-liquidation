import NumberFormat from 'react-number-format';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectType, useWallet, useLCDClient, useConnectedWallet } from '@terra-money/wallet-provider';

// material-ui
import { Button, Chip, DialogContentText, Stack, Popper, ClickAwayListener, CardContent, Grid, Typography, Divider } from '@mui/material';

// project imports
import * as actionTypes from 'constants';
import { truncate, demicrofy } from 'utils';
import { MainCard, Transitions } from 'components';
import { useTokenBalance, useCoinBalance } from 'hooks';

// icons
import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';

export const Wallet = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const lcdClient = useLCDClient();
  const connectedWallet = useConnectedWallet();
  const walletAddress = connectedWallet?.terraAddress;
  const { availableConnections, network, connect, disconnect, post, status: walletStatus } = useWallet();

  const { updateBalance } = useSelector((state) => state.bankReducer);

  const coinBalance = useCoinBalance(walletAddress, lcdClient, updateBalance);
  const { result: tokenBalance, whitelist, bLunaToken, bEthToken } = useTokenBalance(walletAddress, network, updateBalance, walletStatus);

  const [uust, setUust] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (walletStatus === 'INITIALIZING') return;
    if (coinBalance && tokenBalance) {
      const ustCoin = coinBalance.get('uusd');
      const num = ustCoin.toData().amount;
      setUust(demicrofy(num).toString());
      dispatch({ type: actionTypes.SET_BANK, payload: { coinBalance, tokenBalance } });
      dispatch({ type: actionTypes.FETCH_BANK, payload: false });
    }
  }, [coinBalance, dispatch, tokenBalance, walletStatus]);

  useEffect(() => {
    if (walletStatus === 'INITIALIZING') return;
    if (!walletAddress) {
      dispatch({ type: actionTypes.SET_TERRA, payload: { network, lcdClient, post, walletStatus } });
    } else {
      dispatch({ type: actionTypes.SET_TERRA, payload: { network, lcdClient, post, walletStatus, walletAddress, connectedWallet } });
    }
  }, [connectedWallet, dispatch, lcdClient, network, post, walletAddress, walletStatus]);

  useEffect(() => {
    if (walletStatus === 'INITIALIZING') return;

    if (whitelist) {
      dispatch({ type: actionTypes.SET_WHITE_LIST, payload: whitelist[network.name] });
      dispatch({
        type: actionTypes.SET_COLLATERAL_TOKENS,
        payload: [whitelist[network.name][bLunaToken], whitelist[network.name][bEthToken]],
      });
    }
  }, [bEthToken, bLunaToken, dispatch, network, whitelist, walletStatus]);

  const handleDisconnect = () => {
    // dispatch({ type: actionTypes.RESET_STATE });
    setIsOpen(false);
    disconnect();
  };

  return (
    <div>
      <Chip
        ref={ref}
        onClick={() => setIsOpen(true)}
        icon={<FiLogIn />}
        label={walletAddress ? truncate(walletAddress) : 'Connect Wallet'}
        aria-controls={isOpen ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        color="secondary"
      />
      <Popper
        placement="bottom-end"
        open={isOpen}
        anchorEl={ref.current}
        transition
        disablePortal={true}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [4, 16],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" {...TransitionProps}>
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
              <MainCard border={false} elevation={16} content={false}>
                <CardContent>
                  {walletAddress ? (
                    <>
                      <DialogContentText id="alert-dialog-slide-description">Wallet Connected:</DialogContentText>
                      <DialogContentText id="alert-dialog-slide-description">{walletAddress}</DialogContentText>
                      <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
                        <NumberFormat
                          thousandsGroupStyle="thousand"
                          value={uust}
                          decimalSeparator="."
                          displayType="text"
                          type="text"
                          thousandSeparator={true}
                          allowNegative={true}
                          decimalScale={3}
                          suffix=" UST"
                        />
                        <Button variant="contained" onClick={handleDisconnect}>
                          Disconnect
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <Grid container spacing={2} direction="column">
                      <Grid item>
                        <Typography variant="h5">Connect Wallet</Typography>
                      </Grid>
                      <Grid item>
                        <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={1}>
                          {availableConnections
                            .filter(({ type }) => type !== ConnectType.READONLY)
                            .map(({ type, name, icon, identifier = '' }) => (
                              <Button
                                fullWidth={true}
                                variant="contained"
                                key={'connection-' + type + identifier}
                                onClick={() => {
                                  setIsOpen(false);
                                  connect(type, identifier);
                                }}
                              >
                                <img src={icon} alt={name} style={{ width: '1em', height: '1em' }} />
                                {name}
                              </Button>
                            ))}
                        </Stack>
                      </Grid>
                    </Grid>
                  )}
                  <Divider />
                </CardContent>
              </MainCard>
            </ClickAwayListener>
          </Transitions>
        )}
      </Popper>
    </div>
  );
};
