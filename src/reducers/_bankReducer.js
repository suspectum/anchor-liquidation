// actions
import * as actionTypes from 'constants';

const initialState = {
  coinBalance: null,
  tokenBalance: null,
  updateBalance: false,
};

//================================|| BANK REDUCER ||================================//

export const bankReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BANK:
      return {
        ...state,
        coinBalance: action.payload.coinBalance,
        tokenBalance: action.payload.tokenBalance,
      };
    case actionTypes.FETCH_BANK:
      return {
        ...state,
        updateBalance: action.payload,
      };
    default:
      return state;
  }
};
