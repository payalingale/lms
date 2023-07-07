import { legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { RootReducer } from './redux/reducer/RootReducer';

const store =  createStore(RootReducer, composeWithDevTools())

export default store;