import { Dec } from '@terra-money/terra.js';

// project imports
import { GAS_ADJUSTMENT, FALLBACK_GAS_PRICE } from 'constants';

export async function estimateGasFee(walletAddress, msgs, lcd) {
  try {
    const { auth_info } = await lcd.tx.create([{ address: walletAddress }], {
      msgs,
      gasAdjustment: GAS_ADJUSTMENT,
      gasPrices: FALLBACK_GAS_PRICE,
    });

    const estimatedFeeGas = auth_info.fee.amount.toArray().reduce((gas, coin) => {
      return gas.plus(coin.amount);
    }, Dec(0));

    return {
      gasWanted: auth_info.fee.gas_limit,
      txFee: estimatedFeeGas.toNumber(),
    };
  } catch (error) {
    console.error(error);
    return error;
  }
}
