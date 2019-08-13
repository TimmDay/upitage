import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import newUserFlowReducer from '../reducers/newUserFlow';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      newUserFlowReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
