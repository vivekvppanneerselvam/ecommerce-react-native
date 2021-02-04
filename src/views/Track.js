import React, { useState, useEffect } from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { trackSelectedOrder } from '../redux/action/trackOrderAction'
import TimeLine from '../components/TimeLine'
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';

function Track(props) {
    const [order, setOrder] = useState({})
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
            }
        }
    }, [props.track_order_loading])

    function orderInfo(){
        props.navigation.navigate('OrderInfo',{
            id:props.route.params.id
        })
    }

    return (
        <View>
            <Text>{props.route.params.id}</Text>
            <Text>Shipped Via: Processing Order</Text>
            <Text>Ordered Date: {order && order.createDate}</Text>
            <Text>Expected Date: {order && new Date(order.createDate).setDate(new Date(order.createDate).getDate() + 2)}</Text>
            <TimeLine
                timelineDirection={'column'}
                timelineFormat={'time-show-afterward'}
                compactness={20}
                timelineItemHeight={50}
                circleSize={18}
                circleColor={'#007AFF'}
                lineWidth={1}
                showSeparator={false}
                innerCircle={'dot'}
                icon={'hand-stop-o'}
                iconColor={'black'}
                datasource={[
                    { time: '1:44', title: 'Confirmed Order' },
                    { time: '10:45', title: 'Processing Order' },
                    { time: '12:00', title: 'Quality Check' },
                    { time: '14:00', title: 'Product Dispatched' },
                    { time: '16:30', title: 'Product Delivered' }
                ]}
                renderChildren={(item) => <Text>{item.title}</Text>}
                onEventPress={(selectedItem) => { console.log(selectedItem) }}
            />
            <Button fullWidth onPress={() => orderInfo()} backgroundColor="#F08C4F" title="View Order Details" />
        </View >
    )

}
const mapStateToProps = (state) => {
    return {
        track_order_loading: state.TrackOrdersReducer.getIn(['track_order', 'loading'], true),
        track_order: state.TrackOrdersReducer.getIn(['track_order'], Map),
    }
}
export default connect(mapStateToProps, { trackSelectedOrder })(Track)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#ebf0f7"
    }
})
