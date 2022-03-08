import { useSelector, useDispatch } from 'react-redux';

// project imports
import { useAnchorTx } from 'hooks';
import { SubCard } from 'components';
import { SET_TX_INFO } from 'constants';

export const TxSample = () => {
  const dispatch = useDispatch();
  const { connectedWallet } = useSelector((state) => state.terraReducer);
  const { txResult, txError } = useSelector((state) => state.txReducer);

  const { claimAncTx, stakeAncTx, borrowStableTx, depositStable, withdrawtStable, repaytStable } = useAnchorTx();

  const handleStake = async () => stakeAncTx();
  const handleClaimReward = async () => claimAncTx();
  const handleBorrow = async () => borrowStableTx();
  const handleDeposit = async () => depositStable();
  const handleWithdraw = async () => withdrawtStable();
  const handleRepay = async () => repaytStable();

  return (
    <SubCard>
      <h1>Anchor</h1>

      {connectedWallet?.availablePost && !txResult && !txError && <button onClick={handleClaimReward}>Claim ANC Rewards</button>}
      {connectedWallet?.availablePost && !txResult && !txError && <button onClick={handleStake}>Stake ANC</button>}
      {connectedWallet?.availablePost && !txResult && !txError && <button onClick={handleBorrow}>Borrow UST</button>}
      {connectedWallet?.availablePost && !txResult && !txError && <button onClick={handleDeposit}>Deposit UST</button>}
      {connectedWallet?.availablePost && !txResult && !txError && <button onClick={handleWithdraw}>Withdraw UST</button>}
      {connectedWallet?.availablePost && !txResult && !txError && <button onClick={handleRepay}>Repay UST</button>}

      {txResult && (
        <>
          <pre>{JSON.stringify(txResult, null, 2)}</pre>

          {connectedWallet && txResult && (
            <div>
              <a
                href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.result.txhash}`}
                target="_blank"
                rel="noreferrer"
              >
                Open Tx Result in Terra Finder
              </a>
            </div>
          )}
        </>
      )}

      {txError && <pre>{txError}</pre>}

      {(!!txResult || !!txError) && (
        <button
          onClick={() => {
            dispatch({ type: SET_TX_INFO, payload: { txResult: null, txError: null } });
          }}
        >
          Clear result
        </button>
      )}

      {!connectedWallet && <p>Wallet not connected!</p>}

      {connectedWallet && !connectedWallet.availablePost && <p>This connection does not support post()</p>}
    </SubCard>
  );
};
