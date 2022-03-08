import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApolloClient, InMemoryCache } from '@apollo/client';

// project imports
import { alias } from './alias';
import { useTerraAssets } from 'hooks';
import { CONTRACT_ADDRESS } from 'constants';
import * as actionTypes from 'constants';

const parseResult = (data) => {
  const removeEmptyObject = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null));

  return Object.entries(removeEmptyObject).reduce(
    (acc, [token, { Result }]) => ({
      ...acc,
      [token]: JSON.parse(Result).balance,
    }),
    {}
  );
};

export const useTokenBalance = (walletAddress, network, updateBalance, walletStatus) => {
  const { mantle } = network;
  const dispatch = useDispatch();
  const { bLunaToken, bEthToken } = CONTRACT_ADDRESS(network);

  const [result, setResult] = useState();

  const { data: whitelist } = useTerraAssets('cw20/tokens.json');

  const load = async () => {
    try {
      const client = new ApolloClient({
        uri: mantle,
        cache: new InMemoryCache(),
      });

      const queries = alias(
        [bLunaToken, bEthToken].map((contract) => ({
          contract,
          msg: { balance: { address: walletAddress } },
        }))
      );

      const { data } = await client.query({
        query: queries,
        errorPolicy: 'ignore',
      });

      setResult(
        Object.entries(parseResult(data)).map(([token, balance]) => ({
          ...whitelist[network.name][token],
          balance,
        }))
      );
    } catch (error) {
      setResult();
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (walletStatus === 'INITIALIZING') return;
  //   if (whitelist) {
  //     dispatch({ type: actionTypes.SET_WHITE_LIST, payload: whitelist[network.name] });
  //     dispatch({
  //       type: actionTypes.SET_COLLATERAL_TOKENS,
  //       payload: [whitelist[network.name][bLunaToken], whitelist[network.name][bEthToken]],
  //     });
  //   }
  // }, [bEthToken, bLunaToken, dispatch, network, whitelist, walletStatus]);

  useEffect(() => {
    if (walletStatus === 'INITIALIZING') return;

    if (walletAddress && mantle) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bEthToken, bLunaToken, dispatch, mantle, network, walletAddress, whitelist]);

  useEffect(() => {
    if (updateBalance) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBalance]);

  return { result, whitelist, bLunaToken, bEthToken };
};
