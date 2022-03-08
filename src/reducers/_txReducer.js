// actions
import * as actionTypes from 'constants';

const initialState = {
  txResult: null,
  txError: null,
};

//================================|| TX REDUCER ||================================//

export const txReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TX_INFO:
      return {
        ...state,
        txResult: action.payload.txResult,
        txError: action.payload.txError,
      };
    default:
      return state;
  }
};
