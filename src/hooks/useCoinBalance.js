import { useEffect, useState } from 'react';

export const useCoinBalance = (walletAddress, lcd, updateBalance) => {
  const [result, setResult] = useState();

  const fetchBalance = async () => {
    try {
      const [coins] = await lcd.bank.balance(walletAddress);
      coins && setResult(coins);
    } catch (error) {
      setResult();
      console.log(error);
    }
  };

  useEffect(() => {
    if (walletAddress && lcd) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lcd, walletAddress]);

  useEffect(() => {
    if (updateBalance) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBalance]);

  return result;
};
