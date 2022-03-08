// project imports
import { config } from 'config';

// actions
import * as actionTypes from 'constants/actionTypes';

const initialState = {
  fontFamily: config.fontFamilies[0],
  borderRadius: config.borderRadius,
  themeMode: config.themeMode[0],
};

//================================|| CUSTOMIZATION REDUCER ||================================//

export const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload,
      };
    case actionTypes.BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.payload,
      };
    case actionTypes.THEME_MODE:
      return {
        ...state,
        themeMode: action.payload,
      };
    default:
      return state;
  }
};
