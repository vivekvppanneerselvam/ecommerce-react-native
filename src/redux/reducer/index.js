import { combineReducers } from 'redux'
import token from './tokenReducer'
import signin from './signinReducer'
import department from './departmentReducer'
import product from './productReducer'
import variant from './variantsReducer'
import cart from './cartReducer'
import checkout from './checkoutReducer'
import filter from './filterReducer'
import TrackOrdersReducer from './trackOrderReducer'
import OrderHistoryReducer from './orderHistoryReducer'

export default combineReducers({
  token,
  signin,
  department,
  product,
  variant,
  cart,
  checkout,
  filter,
  TrackOrdersReducer: TrackOrdersReducer,
  OrderHistoryReducer: OrderHistoryReducer
})