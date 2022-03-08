// actions
import * as actionTypes from 'constants';

const initialState = {
  collateralTokens: null,
  fetchBids: true,
  currentCollateralToken: null,
  userBids: null,
};

//================================|| BID REDUCER ||================================//

export const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BIDS:
      return {
        ...state,
        fetchBids: action.payload,
      };
    case actionTypes.SET_CURRENT_COLLATERAL_TOKEN:
      return {
        ...state,
        currentCollateralToken: action.payload,
      };
    case actionTypes.SET_COLLATERAL_TOKENS:
      return {
        ...state,
        collateralTokens: action.payload,
      };
    case actionTypes.SET_USER_BIDS:
      return {
        ...state,
        userBids: action.payload,
      };
    default:
      return state;
  }
};
