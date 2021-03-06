import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {tripReducer, singleTripReducer, searchReducer} from './trips';
import categoriesReducer from './categories';
import orderReducer from './orders';
import { cartReducer } from './cart';

const reducer = combineReducers({user, trips: tripReducer, selectedTrip: singleTripReducer,
   categories: categoriesReducer, cart: cartReducer, search: searchReducer, orders: orderReducer})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './orders'
