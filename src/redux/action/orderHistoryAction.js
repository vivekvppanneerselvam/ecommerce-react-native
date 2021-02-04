import serverCall from '../../modules/serverCall'

export const fetchOrderHistory = (user_id) => {
    return dispatch => {
        dispatch({ type: 'FETCH_HISTORY_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/order_history?id=${user_id}` }).then(res => {
            return dispatch({ type: 'FETCH_HISTORY', loading: false, data: res.data.order, error: false })
        }).catch(err => {
            dispatch({ type: 'FETCH_HISTORY_ERROR', loading: false, data: err, error: true })
        })
    }
}