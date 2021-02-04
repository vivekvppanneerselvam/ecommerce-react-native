import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
/* import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createMaterialTopTabNavigator
} from "react-navigation"; */

import { View, Text, Button, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
//import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { connect, Provider } from 'react-redux';
import { StackNavigationRef } from './src/modules/Navigation/StackNavigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import store from './src/redux/store';
import Icon from "@expo/vector-icons/Ionicons";
import Login from "./src/views/Login";
import SignIn from "./src/views/SignIn";
import Register from "./src/views/Register";
import Home from "./src/views/Home";
import Category from "./src/views/Category";
import Detail from "./src/views/Detail";
import Basket from "./src/views/Basket";
import EditBasket from "./src/views/EditBasket";
import Address from "./src/views/Address";
import Shipping from "./src/views/Shipping";
import Payment from "./src/views/Payment";
import TermsAndConditions from "./src/views/TermsAndConditions";
import CreditCard from "./src/views/CreditCard";
import OrderList from './src/views/OrderList'
import OrderHistory from './src/views/OrderHistory'
import OrderInfo from './src/views/OrderInfo'
import Track from './src/views/Track'
import CustomDrawerComponent from "./src/components/CustomDrawerComponent";
import { AuthContext } from './src/helpers/index'
import {
  NavigationContainer, DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function App(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const initialLoginState = { isLoading: true, userName: null, userToken: null, };
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return { ...prevState, userToken: action.token, isLoading: false, };
      case 'LOGIN':
        return { ...prevState, userName: action.id, userToken: action.token, isLoading: false, };
      case 'LOGOUT':
        return { ...prevState, userName: null, userToken: null, isLoading: false, };
      case 'REGISTER':
        return { ...prevState, userName: action.id, userToken: action.token, isLoading: false, };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      console.log('signIn', foundUser);
      const userToken = foundUser.token
      const userName = foundUser.user_id;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      try {
        //await props.cleanUp()
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {

    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log(loginState.userToken)
  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext} >
        <NavigationContainer ref={StackNavigationRef} styles={styles.container}>
          {/* <StatusBar/> */}
          {loginState.userToken !== null ? (
            < DrawerNavigator />
          ) : <RootStackScreen />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App


function MainNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: () => <NavigationBasket navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f4511e', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      }
    }}>

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Basket" component={Basket} />
      <Stack.Screen name="Checkout" component={CheckoutTabNavigator} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="EditBasket" component={EditBasket} />
      <Stack.Screen name="Track" component={OrderList} />
      <Stack.Screen name="TimeLine" component={Track} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="OrderInfo" component={OrderInfo} />

    </Stack.Navigator>
  );
}

function CheckoutTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Address" component={Address} />
      <Tab.Screen name="Shipping" component={Shipping} />
      <Tab.Screen name="Payment" component={PaymentStackNavigator} />
    </Tab.Navigator>
  );
}

function PaymentStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="CreditCard" component={CreditCard} />
    </Stack.Navigator>
  )
}

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Icon
          name="md-menu"
          color="white"
          size={30}
          style={{
            paddingLeft: 10
          }}
        />

      </TouchableOpacity>
    </View>
  );
}

const NavigationBasket = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        onPress={() => props.navigationProps.navigate("Basket")}
        name="md-cart"
        color="white"
        size={30}
        style={{
          paddingRight: 10
        }}
      />
    </View>
  )
}



function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContentOptions={{
      activeTintColor: '#e91e63',
      itemStyle: { marginVertical: 30 },
    }} drawerContent={props => <CustomDrawerComponent {...props} />}>
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  )
}

const RootStackScreen = ({ navigation }) => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="Register" component={Register} />
    {/* <Stack.Screen name="Home" component={Home} /> */}
  </Stack.Navigator>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 