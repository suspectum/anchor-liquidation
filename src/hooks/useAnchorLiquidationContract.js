import { useSelector, useDispatch } from 'react-redux';
import { MsgExecuteContract, Fee, Dec, Int } from '@terra-money/terra.js';
import { CreateTxFailed, Timeout, TxFailed, TxUnspecifiedError, UserDenied } from '@terra-money/wallet-provider';

// project imports
// project imports
import { estimateGasFee } from 'utils';
import { CONTRACT_ADDRESS, APP_MEMO, SET_TX_INFO, FETCH_BIDS, FETCH_BANK } from 'constants';

export const useAnchorLiquidationContract = () => {
  const dispatch = useDispatch();
  const { walletAddress, lcdClient: lcd, post, network } = useSelector((state) => state.terraReducer);
  const { liquidationQueueContract: contractAddress } = CONTRACT_ADDRESS(network);

  const procces = async (msgs) => {
    // TODO check error comes from gas
    // try {
    //   const { gasWanted, txFee } = await estimateGasFee(walletAddress, msgs, lcdClient);
    // } catch (error) {
    //   console.log(error);
    // }
    const { gasWanted, txFee } = await estimateGasFee(walletAddress, msgs, lcd);
    const tx = {
      msgs,
      fee: new Fee(gasWanted, txFee + 'uusd'),
      memo: APP_MEMO,
    };

    // TODO add alert for tx result
    try {
      const TxResult = await post(tx);
      const response = await pollTransaction(TxResult.result.txhash);
      if (!response.code) {
        dispatch({ type: FETCH_BIDS, payload: true });
        dispatch({ type: FETCH_BANK, payload: true });
        dispatch({ type: SET_TX_INFO, payload: { txResult: TxResult } });
      }
    } catch (error) {
      if (error instanceof UserDenied) {
        dispatch({ type: SET_TX_INFO, payload: { txError: 'User Denied' } });
      } else if (error instanceof CreateTxFailed) {
        dispatch({ type: SET_TX_INFO, payload: { txError: 'Create Tx Failed: ' + error.message } });
      } else if (error instanceof TxFailed) {
        dispatch({ type: SET_TX_INFO, payload: { txError: 'Tx Failed: ' + error.message } });
      } else if (error instanceof Timeout) {
        dispatch({ type: SET_TX_INFO, payload: { txError: 'Timeout' } });
      } else if (error instanceof TxUnspecifiedError) {
        dispatch({ type: SET_TX_INFO, payload: { txError: 'Unspecified Error: ' + error.message } });
      } else {
        dispatch({ type: SET_TX_INFO, payload: { txError: 'Unknown Error: ' + (error instanceof Error ? error.message : String(error)) } });
      }
    }
  };

  async function pollTransaction(txhash, timeout = 30000, interval = 3000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        return await lcd.tx.txInfo(txhash);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
    return undefined;
  }

  function submitBid({ amount, collateral_token, premium_slot }) {
    const msgs = [
      new MsgExecuteContract(
        walletAddress,
        contractAddress,
        {
          submit_bid: {
            premium_slot,
            collateral_token,
          },
        },
        { uusd: new Int(new Dec(amount).mul(1000000)).toString() }
      ),
    ];
    return procces(msgs);
  }

  //================================|| MAIN FUNCTIONS ||================================//

  function retractBid(bid_idx, amount) {
    if (typeof bid_idx !== 'string') {
      const msgs = bid_idx.map((bid_idx) => {
        return new MsgExecuteContract(walletAddress, contractAddress, {
          retract_bid: {
            bid_idx,
            amount: amount && new Int(new Dec(amount).mul(1000000)).toString(),
          },
        });
      });
      return procces(msgs);
    }

    const msgs = [
      new MsgExecuteContract(walletAddress, contractAddress, {
        retract_bid: {
          bid_idx,
          amount: amount && new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];

    return procces(msgs);
  }

  function activateBids(bid_idx, collateral_token) {
    const msgs = [
      new MsgExecuteContract(walletAddress, contractAddress, {
        activate_bids: {
          bids_idx: [...bid_idx],
          collateral_token,
        },
      }),
    ];
    return procces(msgs);
  }

  function claimLiquidations(collateralTokenContract, bidIdx) {
    const msgs = [
      new MsgExecuteContract(walletAddress, contractAddress, {
        claim_liquidations: {
          collateral_token: collateralTokenContract,
          bids_idx: bidIdx,
        },
      }),
    ];
    return procces(msgs);
  }

  function getBidPoolsByCollateral(collateralTokenContract, limit = 31) {
    const msg = {
      bid_pools_by_collateral: {
        collateral_token: collateralTokenContract,
        limit: limit,
      },
    };
    return lcd.wasm.contractQuery(contractAddress, msg);
  }

  async function getBidsByUser(collateralTokenContract, startAfter = '0', limit = 31) {
    const msg = {
      bids_by_user: {
        collateral_token: collateralTokenContract,
        bidder: walletAddress,
        start_after: startAfter,
        limit: limit,
      },
    };
    return lcd.wasm.contractQuery(contractAddress, msg);
  }

  return {
    submitBid,
    retractBid,
    activateBids,
    getBidsByUser,
    claimLiquidations,
    getBidPoolsByCollateral,
  };
};
