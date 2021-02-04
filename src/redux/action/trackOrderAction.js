import serverCall from '../../modules/serverCall'

export const fetchActiveOrders = (user_id) => {
    return dispatch => {
        dispatch({ type: 'ACTIVE_ORDERS_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/active_order?id=${user_id}` }).then(res => {
            return dispatch({ type: 'ACTIVE_ORDERS', loading: false, data: res.data.order, error: false })
        }).catch(err => {
            dispatch({ type: 'ACTIVE_ORDERS_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const trackSelectedOrder = (order_id) => dispatch => {
    dispatch({ type: 'TRACK_ORDER_LOADING', loading: true, error: false })
    return serverCall({ method: 'GET', url: `/order?id=${order_id}` }).then(res => {
        dispatch({ type: 'TRACK_ORDER', loading: false, data: res.data.order, error: false })        
    }).catch(err => {
        dispatch({ type: 'TRACK_ORDER_ERROR', loading: false, data: err, error: true })        
    })
}

export const getSelectedOrderAddress = (address_id) => dispatch => {
    dispatch({ type: 'ADDRESS_BY_ID_LOADING', loading: true, error: false })
    return serverCall({ method: 'GET', url: `/address?id=${address_id}` }).then(res => {
        dispatch({ type: 'ADDRESS_BY_ID', loading: false, data: res.data.address, error: false })        
    }).catch(err => {
        dispatch({ type: 'ADDRESS_BY_ID_ERROR', loading: false, data: err, error: true })        
    })
}

export const getCartById = (cart_id) => dispatch => {
    dispatch({ type: 'CART_BY_ID_LOADING', loading: true, error: false })
    return serverCall({ method: 'GET', url: `/cart?id=${cart_id}` }).then(res => {
        dispatch({ type: 'CART_BY_ID', loading: false, data: res.data.cart, error: false })        
    }).catch(err => {
        dispatch({ type: 'CART_BY_ID_ERROR', loading: false, data: err, error: true })        
    })
}

export const updateOrder =(payload)=> dispatch => {
    dispatch({ type: 'UPDATE_ORDER_LOADING', loading: true, error: false })
    return serverCall({ method: 'POST', url: `/update_order`, data:payload }).then(res => {
        dispatch({ type: 'UPDATE_ORDER', loading: false, data: res.data.cart, error: false })        
    }).catch(err => {
        dispatch({ type: 'UPDATE_ORDER_ERROR', loading: false, data: err, error: true })        
    })
}
