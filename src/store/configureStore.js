import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authReducer from '../reducers/auth'
import newUserFlowReducer from '../reducers/newUserFlow'
import inputTextReducer from '../reducers/inputText'
import fillGapsPrepReducer from '../reducers/fillGapsPrep'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  userOptions: newUserFlowReducer,
  inputTextData: inputTextReducer,
  fillGapsPrepReducer: fillGapsPrepReducer
});

const persistConfig = { key: 'root', storage }
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)
const persistor = persistStore(store)

export default () => {
  return { store, persistor };
};
