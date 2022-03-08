import { useSelector, useDispatch } from 'react-redux';
import { MsgExecuteContract, Fee, Dec, Int } from '@terra-money/terra.js';
import { CreateTxFailed, Timeout, TxFailed, TxUnspecifiedError, UserDenied } from '@terra-money/wallet-provider';

// project imports
import { estimateGasFee } from 'utils';
import { CONTRACT_ADDRESS, APP_MEMO, SET_TX_INFO, FETCH_BANK } from 'constants';

export const useAnchorTx = () => {
  const dispatch = useDispatch();
  const { walletAddress, lcdClient: lcd, post, network } = useSelector((state) => state.terraReducer);
  const { mmMarket, ANC, gov, aTerra } = CONTRACT_ADDRESS(network);

  //================================|| HELPER FUNCTIONS ||================================//

  const createHookMsg = (msg) => Buffer.from(JSON.stringify(msg)).toString('base64');

  const procces = async (msgs) => {
    const { gasWanted, txFee } = await estimateGasFee(walletAddress, msgs, lcd);

    const tx = {
      msgs,
      fee: new Fee(gasWanted, txFee + 'uusd'),
      memo: APP_MEMO,
    };

    try {
      const TxResult = await post(tx);
      const res = await pollTransaction(TxResult.result.txhash);
      if (res) {
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

  async function queryMarketEpochState() {
    const { exchange_rate } = await lcd.wasm.contractQuery(mmMarket, {
      epoch_state: {},
    });
    return exchange_rate;
  }

  const num = 10000;

  function claimAncTx() {
    const msgs = [
      new MsgExecuteContract(walletAddress, mmMarket, {
        claim_rewards: {},
      }),
    ];
    return procces(msgs);
  }

  //================================|| MAIN FUNCTIONS ||================================//

  function stakeAncTx() {
    const msgs = [
      new MsgExecuteContract(walletAddress, ANC, {
        send: {
          contract: gov,
          amount: '50000000',
          msg: createHookMsg({
            stake_voting_tokens: {},
          }),
        },
      }),
    ];
    return procces(msgs);
  }

  function borrowStableTx() {
    const msgs = [
      new MsgExecuteContract(walletAddress, mmMarket, {
        borrow_stable: {
          //   borrow_amount: new Int(new Dec(amount).mul(1000000)).toString(),
          borrow_amount: new Int(new Dec(num).mul(1000000)).toString(),
        },
      }),
    ];
    return procces(msgs);
  }

  function depositStable() {
    const msgs = [
      new MsgExecuteContract(
        walletAddress,
        mmMarket,
        {
          deposit_stable: {},
        },
        {
          uusd: new Int(new Dec(num).mul(1000000)).toString(),
        }
      ),
    ];
    return procces(msgs);
  }

  async function withdrawtStable() {
    const exchange_rate = await queryMarketEpochState();
    const msgs = [
      new MsgExecuteContract(walletAddress, aTerra, {
        send: {
          contract: mmMarket,
          amount: new Int(new Dec(num).mul(1000000).div(exchange_rate)).toString(),
          msg: createHookMsg({
            redeem_stable: {},
          }),
        },
      }),
    ];
    return procces(msgs);
  }

  async function repaytStable() {
    const msgs = [
      new MsgExecuteContract(
        walletAddress,
        mmMarket,
        {
          repay_stable: {},
        },
        {
          uusd: new Int(new Dec(num).mul(1000000)).toString(),
        }
      ),
    ];
    return procces(msgs);
  }

  return {
    claimAncTx,
    stakeAncTx,
    repaytStable,
    depositStable,
    borrowStableTx,
    withdrawtStable,
  };
};
