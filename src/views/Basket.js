import React, { Component } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "@expo/vector-icons/Ionicons";
import BasketItem from "../components/BasketItem";
import BasketTotalList from "../components/BasketTotalList";
import { getCartByUserId, postCart } from '../redux/action/cartAction'
import { connect } from 'react-redux'

class Basket extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    //this.props.getCartByUserId()

  }

  getItems = () => {
    if (Object.keys(this.props.cart).length > 0) {
      return Object.keys(this.props.cart.items).map((i) => {
        return <BasketItem
          editIcon={true}
          imageUri={this.props.cart.items[i].item.imagePath}
          name={this.props.cart.items[i].item.title}
          color={this.props.cart.items[i].item.color}
          size={this.props.cart.items[i].item.size}
          cart={this.props.cart.items[i]}
        />
      })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#EFF0F1" }}>
        {/* ItemLists_upper */}
        <View style={{ flex: 2 }}>
          <ScrollView>
            {this.getItems()}
          </ScrollView>
        </View>
        {/* ItemLists_upper */}
        {/* total_lower */}
        <View style={{ flex: 1, paddingTop: wp("10%") }}>
          <BasketTotalList label="Shipping" price={6} />
          <BasketTotalList label="Your total" price={this.props.cart.totalPrice} />
          <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: "flex-end", paddingBottom: 15 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate("Checkout")}
              style={{
                flexDirection: "row", backgroundColor: "#F08C4F", justifyContent: "center",
                alignItems: "center", borderRadius: 2, shadowOffset: { width: 1, height: 2 },
                shadowColor: "#000", shadowOpacity: 0.4, elevation: 4, paddingVertical: 10
              }}
            >
              <View style={{ marginRight: 15 }}>
                <Icon name="md-cart" size={20} color="white" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>
                Place your order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* total_lower */}
      </View>
    );
  }
}
const mapStoreToProps = state => ({
  cart: state.cart.cart
})
const mapDispatchToProps = dispatch => ({
  getCartByUserId: dispatch(getCartByUserId()),
  //postCart: (pid, increase, decrease) => dispatch(postCart(pid, increase, decrease))
})

export default connect(mapStoreToProps, mapDispatchToProps)(Basket);

{
  /* <Button
          title="go to Checkout"
          onPress={() => this.props.navigation.navigate("Checkout")}
        />
        <Button
          title="go to EditBasket"
          onPress={() => this.props.navigation.navigate("EditBasket")}
        /> */
}
