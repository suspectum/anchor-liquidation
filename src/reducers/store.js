import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// project imports
import { rootReducer } from './reducer';

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);
