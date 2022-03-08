// actions
import * as actionTypes from 'constants';

const initialState = {
  whitelist: null,
};

//================================|| WHITELIST REDUCER ||================================//

export const whitelistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WHITE_LIST:
      return {
        whitelist: action.payload,
      };
    default:
      return state;
  }
};
