import { fromJS } from 'immutable'
let initialState = fromJS({});
function TrackOrdersReducer(state = initialState, action) {
    switch (action.type) {
        case 'ACTIVE_ORDERS_LOADING':
            return state.setIn(['active_order', 'loading'], action.loading)
                .setIn(['active_order', 'error'], action.error)
        case 'ACTIVE_ORDERS':
            return state.setIn(['active_order', 'data'], action.data)
                .setIn(['active_order', 'loading'], action.loading)
                .setIn(['active_order', 'error'], action.error)
        case 'ACTIVE_ORDERS_ERROR':
            return state.setIn(['active_order', 'data'], action.data)
                .setIn(['active_order', 'loading'], action.loading)
                .setIn(['active_order', 'error'], action.error)
        case 'TRACK_ORDER_LOADING':
            return state.setIn(['track_order', 'loading'], action.loading)
                .setIn(['track_order', 'error'], action.error)
        case 'TRACK_ORDER':
            return state.setIn(['track_order', 'data'], action.data)
                .setIn(['track_order', 'loading'], action.loading)
                .setIn(['track_order', 'error'], action.error)
        case 'TRACK_ORDER_ERROR':
            return state.setIn(['track_order', 'data'], action.data)
                .setIn(['track_order', 'loading'], action.loading)
                .setIn(['track_order', 'error'], action.error)
        case 'ADDRESS_BY_ID_LOADING':
            return state.setIn(['address_by_id', 'loading'], action.loading)
                .setIn(['address_by_id', 'error'], action.error)
        case 'ADDRESS_BY_ID':
            return state.setIn(['address_by_id', 'data'], action.data)
                .setIn(['address_by_id', 'loading'], action.loading)
                .setIn(['address_by_id', 'error'], action.error)
        case 'ADDRESS_BY_ID_ERROR':
            return state.setIn(['address_by_id', 'data'], action.data)
                .setIn(['address_by_id', 'loading'], action.loading)
                .setIn(['address_by_id', 'error'], action.error)

        case 'CART_BY_ID_LOADING':
            return state.setIn(['cart_by_id', 'loading'], action.loading)
                .setIn(['cart_by_id', 'error'], action.error)
        case 'CART_BY_ID':
            return state.setIn(['cart_by_id', 'data'], action.data)
                .setIn(['cart_by_id', 'loading'], action.loading)
                .setIn(['cart_by_id', 'error'], action.error)
        case 'CART_BY_ID_ERROR':
            return state.setIn(['cart_by_id', 'data'], action.data)
                .setIn(['cart_by_id', 'loading'], action.loading)
                .setIn(['cart_by_id', 'error'], action.error)

        case 'UPDATE_ORDER_LOADING':
            return state.setIn(['update_order', 'loading'], action.loading)
                .setIn(['update_order', 'error'], action.error)
        case 'UPDATE_ORDER':
            return state.setIn(['update_order', 'data'], action.data)
                .setIn(['update_order', 'loading'], action.loading)
                .setIn(['update_order', 'error'], action.error)
        case 'UPDATE_ORDER_ERROR':
            return state.setIn(['update_order', 'data'], action.data)
                .setIn(['update_order', 'loading'], action.loading)
                .setIn(['update_order', 'error'], action.error)


        default:
            return state
    }
}

export default TrackOrdersReducer