import React, { useState, useEffect } from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { trackSelectedOrder, getSelectedOrderAddress, getCartById, updateOrder } from '../redux/action/trackOrderAction'
import ReviewBasket from '../components/ReviewBasket'
import calcPrice from '../components/calcPrice'
import { View, StyleSheet, Button, Alert, TextInput, Text, ScrollView } from "react-native";

let arr = [{ key: -1, value: 'New' },
{ key: 0, value: 'Confirmed Order' },
{ key: 1, value: 'Processing Order' },
{ key: 2, value: 'Quality Check' },
{ key: 3, value: 'Product Dispatched' },
{ key: 4, value: 'Product Delivered' }
]
function OrderInfo(props) {
    const [order, setOrder] = useState({})
    const [cart, setCart] = useState({})
    const [address, setAddress] = useState({})
    const [comment, setComment] = useState('')

    console.log(props.route.params.id)
    useEffect(() => {
        props.trackSelectedOrder(props.route.params.id)
    }, [])

    useEffect(() => {
        if (!props.track_order_loading) {
            if (!props.track_order.toJS().error) {
                Object.keys(props.track_order.toJS().data[0]).map(key => {
                    setOrder(prevState => {
                        prevState[key] = props.track_order.toJS().data[0][key]
                        return ({ ...prevState })
                    })
                })
                props.getCartById(props.track_order.toJS().data[0].cartId)
                props.getSelectedOrderAddress(props.track_order.toJS().data[0].addressId)
            }
        }
    }, [props.track_order_loading])

    useEffect(() => {
        if (!props.cart_loading) {
            if (!props.cart.toJS().error) {
                Object.keys(props.cart.toJS().data).map(key => {
                    setCart(prevState => {
                        prevState[key] = props.cart.toJS().data[key]
                        return ({ ...prevState })
                    })
                })
            }
        }
    }, [props.cart_loading])

    useEffect(() => {
        if (!props.address_by_id_loading) {
            if (!props.address_by_id.toJS().error) {
                Object.keys(props.address_by_id.toJS().data[0]).map(key => {
                    setAddress(prevState => {
                        prevState[key] = props.address_by_id.toJS().data[0][key]
                        return ({ ...prevState })
                    })
                })
            }
        }
    }, [props.address_by_id_loading])

    useEffect(() => {
        if (!props.update_order_loading) {
            if (!props.update_order.toJS().error) {
                alert("Order updated successfully.")
                setComment('')
            } else {
                alert("Error while updating order.")
            }
        }
    }, [props.update_order_loading])

    const onChangeHandler = (e) => {
        let id = e.target.id, value = e.target.value
        if (value) {
            setOrder(prevState => {
                prevState[id] = value
                return ({ ...prevState })
            })
        }
    }
    function updateOrderStatus() {
        if (order) {
            props.updateOrder(order)
        }
    }
    

    function postComment() {
        if (order && comment) {
            setOrder(prevState => {
                let commentsArr = prevState.comments
                prevState.comments = commentsArr.push(comment)
                return ({ ...prevState })
            })
            props.updateOrder(order)
        }
    }

    function confirmationHandler(val) {
        if (val) {
            if (order) {
                setOrder(prevState => {
                    prevState.orderLevel = 5
                    return ({ ...prevState })
                })
                props.updateOrder(order)
            }
        } else {

        }
    }



    console.log(props.user)

    const getItems = () => {
        if (Object.keys(cart).length > 0) {
            return Object.keys(cart.items).map((i) => {
                return <ReviewBasket
                    editIcon={true}
                    imageUri={cart.items[i].item.imagePath}
                    name={cart.items[i].item.title}
                    color={cart.items[i].item.color}
                    size={cart.items[i].item.size}
                    cart={cart.items[i]}
                />
            })
        }
    }

    const confirmation = () => {
        return (Alert.alert(
            "Confirmation",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => confirmationHandler(false),
                    style: "cancel"
                },
                { text: "OK", onPress: () => confirmationHandler(true) }
            ],
            { cancelable: false }
        ))
    }


    return (
        <View >


            <Text>User Information</Text>
            <View style={styles.boxSimple}>
                <Text>Name:{props.user && props.user.user_name}</Text>
                <Text>Email :{props.user && props.user.email}</Text>
            </View>
            <Text>Order Details</Text>
            <View style={styles.boxSimple}>
                <Text>Priority:{order && order.priority}</Text>
                <Text>Total Amount :{order && order.totalAmount}</Text>
                <Text>Payment Method :{order && order.paymentMethod}</Text>
                <Text>Payment Status :{order && order.paymentStatus}</Text>
                <Text>Order Process :{order && arr.filter(item => item.key === order.orderLevel).map(item => item.value)[0]}</Text>
            </View>
            <Text>Address Information</Text>
            <View style={styles.boxSimple}>
                <Text>Address 1: {address && address.address1}</Text>
                <Text>Address 2 :{address && address.address2}</Text>
                <Text>City :{address && address.city} Pincode:{address && address.pincode} </Text>
                <Text>State :{address && address.state}</Text>
                <Text>Land Mark :{address && address.landMark}</Text>
                <Text>Phone No :{address && address.phoneNo}</Text>
                <Text>Address Type :{address && address.addressType}</Text>
            </View>
            <Text>Total Quatity :{cart && cart.totalQty}</Text>
            <Text>Sub Total:Rs. {cart && cart.totalPrice}</Text>
            <Text>Delivery Charges :{'Free'}</Text>
            <Text>Estimated tax :Rs. {calcPrice(cart.totalPrice).taxes}</Text>
            <Text>Total :Rs. {calcPrice(cart.totalPrice).total}</Text>
            <View style={{ flex: 1, backgroundColor: "#EFF0F1" }}>
                {/* ItemLists_upper */}
                <View style={{ flex: 2 }}>
                    <ScrollView>
                        {getItems()}
                    </ScrollView>
                </View>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={styles.buttonStyle}>
                    <TextInput placeholder="" onChangeText={(e) => setComment(e)} />
                </View>
                <View style={styles.buttonStyle}>
                    <Button onPress={() => postComment()} backgroundColor="#F08C4F" title="Post" />
                </View>
            </View>



            <Button onPress={confirmation} backgroundColor="#F08C4F" title="Cancel Order" />



        </View >
    )
}

const styles = StyleSheet.create({

    buttonStyle: {
        marginHorizontal: 20,
        marginTop: 5
    },
    boxSimple: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        margin: 20,
    },
});
const mapStateToProps = (state) => {
    return {
        track_order_loading: state.TrackOrdersReducer.getIn(['track_order', 'loading'], true),
        track_order: state.TrackOrdersReducer.getIn(['track_order'], Map),
        address_by_id_loading: state.TrackOrdersReducer.getIn(['address_by_id', 'loading'], true),
        address_by_id: state.TrackOrdersReducer.getIn(['address_by_id'], Map),
        cart_loading: state.TrackOrdersReducer.getIn(['cart_by_id', 'loading'], true),
        cart: state.TrackOrdersReducer.getIn(['cart_by_id'], Map),
        update_order_loading: state.TrackOrdersReducer.getIn(['update_order', 'loading'], true),
        update_order: state.TrackOrdersReducer.getIn(['update_order'], Map),
        user: state.token.user_token
    }
}
export default connect(mapStateToProps, { trackSelectedOrder, getSelectedOrderAddress, getCartById, updateOrder })(OrderInfo)