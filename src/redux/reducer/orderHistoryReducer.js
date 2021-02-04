import { fromJS } from 'immutable'
let initialState = fromJS({});
function OrderHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_HISTORY_LOADING':
            return state.setIn(['history', 'loading'], action.loading)
                .setIn(['history', 'error'], action.error)
        case 'FETCH_HISTORY':
            return state.setIn(['history', 'data'], action.data)
                .setIn(['history', 'loading'], action.loading)
                .setIn(['history', 'error'], action.error)
        case 'FETCH_HISTORY_ERROR':
            return state.setIn(['history', 'data'], action.data)
                .setIn(['history', 'loading'], action.loading)
                .setIn(['history', 'error'], action.error)
        default:
            return state
    }
}

export default OrderHistoryReducer