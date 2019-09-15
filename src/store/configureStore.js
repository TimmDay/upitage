import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from '../reducers/auth'
import newUserFlowReducer from '../reducers/newUserFlow'
import inputTextReducer from '../reducers/inputText'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      userOptions: newUserFlowReducer,
      inputTextData: inputTextReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
