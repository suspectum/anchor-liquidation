// actions
import * as actionTypes from 'constants';

const initialState = {
  walletAddress: null,
  network: null,
  post: null,
  lcdClient: null,
  connectedWallet: null,
  walletStatus: null,
};

//================================|| TERRA REDUCER ||================================//

export const terraReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TERRA:
      const { walletAddress, network, post, lcdClient, connectedWallet, walletStatus } = action.payload;
      return {
        ...state,
        walletAddress: walletAddress ? walletAddress : initialState.walletAddress,
        network: network ? network : initialState.network,
        post: post ? post : initialState.post,
        lcdClient: lcdClient ? lcdClient : initialState.lcdClient,
        connectedWallet: connectedWallet ? connectedWallet : initialState.connectedWallet,
        walletStatus: walletStatus ? walletStatus : initialState.walletStatus,
      };
    default:
      return state;
  }
};
