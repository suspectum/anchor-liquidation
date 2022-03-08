import { combineReducers } from 'redux';
import { RESET_STATE } from 'constants/actionTypes';

// reducer import
import { bankReducer } from './_bankReducer';
import { terraReducer } from './_terraReducer';
import { bidReducer } from './_bidReducer';
import { txReducer } from './_txReducer';
import { whitelistReducer } from './_whitelistReducer';
import { customizationReducer } from './_customizationReducers';

//================================|| COMBINED REDUCER ||================================//

const combinedReducer = combineReducers({ bankReducer, terraReducer, bidReducer, txReducer, whitelistReducer, customizationReducer });

export const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return combinedReducer(state, action);
};
