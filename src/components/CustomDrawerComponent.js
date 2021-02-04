import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
  Ionicons as Icon, FontAwesome as FontAwesomeIcon,
  Entypo as EntypoIcon, FontAwesome5 as FontAwesome5Icon, AntDesign
} from "@expo/vector-icons";
import { AuthContext } from '../helpers/index'



function CustomDrawerComponent(props) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/drawer_bg.jpg")}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "contain"
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(91, 188, 157, 0.9)",
            paddingTop: wp("14%"),
            paddingHorizontal: wp("9.5%"),
            paddingBottom: wp("7%")
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Menu
              </Text>
            <Icon
              onPress={() => props.navigation.closeDrawer()}
              name="ios-close"
              color="white"
              size={50}
            />
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "space-around",
              marginVertical: 20,
              padding: 5
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate("Home");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 5
              }}
            >
              <Icon name="ios-home" color="white" size={30} />
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "400",
                  marginLeft: wp("4.5%")
                }}
              >
                Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate("Home");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 5
              }}
            >
              <Icon name="ios-search" color="white" size={30} />
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "400",
                  marginLeft: wp("4.5%")
                }}
              >
                Search
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate("Home");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 5
              }}
            >
              <Icon name="ios-list-box" color="white" size={30} />
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "400",
                  marginLeft: wp("4.5%")
                }}
              >
                Categories
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate("Basket");
              }}
              style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
              <Icon name="ios-cart" color="white" size={30} />
              <Text style={{ color: "white", fontSize: 20, fontWeight: "400", marginLeft: wp("4.5%") }}>
                Basket
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate("Track");
              }}
              style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
              <EntypoIcon name="location" color="white" size={30} />
              <Text style={{ color: "white", fontSize: 20, fontWeight: "400", marginLeft: wp("4.5%") }}>
                Track Order
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate("OrderHistory");
              }}
              style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
              <FontAwesomeIcon name="history" color="white" size={30} />
              <Text style={{ color: "white", fontSize: 20, fontWeight: "400", marginLeft: wp("4.5%") }}>
                Order History
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                signOut();
              }}
              style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
              <AntDesign name="logout" size={24} color="black" />
              <Text style={{ color: "white", fontSize: 20, fontWeight: "400", marginLeft: wp("4.5%") }}>
                Sign Out
                </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: wp("15%"),
                  height: wp("15%"),
                  overflow: "hidden",
                  borderRadius: wp("10%"),
                  marginRight: wp("4.5%")
                }}
              >
                <Image
                  source={require("../../assets/reviewer.jpg")}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "contain"
                  }}
                />
              </View>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "400" }}>Account</Text>

            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

}

export default CustomDrawerComponent;

{
  /* <Text> CustomDrawerComponent </Text>
        <Button
          title="go to Basket"
          onPress={() => props.navigation.navigate("Basket")}
        /> */
}
