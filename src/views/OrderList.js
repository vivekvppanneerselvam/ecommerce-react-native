import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Auth from '../modules/Auth'
import { fetchActiveOrders } from '../redux/action/trackOrderAction'
import { Map } from 'immutable'


import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';

function TrackOrders(props) {
    const [activeOrders, setActiveOrders] = useState([])
    useEffect(() => {
        async function fetchData() {
            let user_id = await Auth.getUserId()
            props.fetchActiveOrders(user_id)
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (!props.active_orders_loading) {
            if (!props.active_orders.toJS().error) {
                setActiveOrders(props.active_orders.toJS().data)
            }
        }
    }, [props.active_orders_loading])

    function onClickOrderId(id) {
        props.navigation.navigate('TimeLine',{
            id
        })
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.contentList}
                columnWrapperStyle={styles.listContainer}
                data={activeOrders.length > 0 && activeOrders}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.card} onPress={() => { onClickOrderId(item._id) }}>
                            {/* <Image style={styles.image} source={{ uri: item.image }} /> */}
                            <View style={styles.cardContent}>
                                <Text style={styles.count}>Order No:{item._id}</Text>
                                <Text style={styles.count}>Created Date:{item.createDate}</Text>
                                <Text style={styles.count}>Priority:{item.priority}</Text>
                                <Text style={styles.count}>Payment Method:{item.paymentMethod}|Total Amount:{item.totalAmount}</Text>
                                <TouchableOpacity style={styles.followButton} onPress={() => onClickOrderId(item._id)}>
                                    <Text style={styles.followButtonText}>Explore now</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#ebf0f7"
    },
    contentList: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#ebf0f7"
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold'
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#6666ff"
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#dcdcdc",
    },
    followButtonText: {
        color: "#dcdcdc",
        fontSize: 12,
    },
});
const mapStateToProps = (state) => {
    return {
        active_orders_loading: state.TrackOrdersReducer.getIn(['active_order', 'loading'], true),
        active_orders: state.TrackOrdersReducer.getIn(['active_order'], new Map()),

    }
}
export default connect(mapStateToProps, { fetchActiveOrders })(TrackOrders)
