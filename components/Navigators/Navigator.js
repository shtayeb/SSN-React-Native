import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { FontAwesome } from "@expo/vector-icons";

import Landing from "../screens/auth/Landing";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";

// import Home from "./components/screens/__Home";
import BottomNavigator from "./BottomNavigator";

const Stack = createStackNavigator();

export default class AppNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // loaded: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    //check the local storage for the token
    // const user = false;
    // if (!user) {
    //   this.setState({
    //     loggedIn: false,
    //     // loaded: true,
    //   });
    // } else {
    //   this.setState({
    //     loggedIn: true,
    //     // loaded: true,
    //   });
    // }
  }

  logIn() {
    this.setState({ loggedIn: true });
  }

  render() {
    const { loggedIn } = this.state;
    // if user in not logged in they should see these pages
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              // options={({ navigation }) => ({
              //   // title: "",
              //   headerStyle: {
              //     backgroundColor: "#f9fafd",
              //     shadowColor: "#f9fafd",
              //     elevation: 0,
              //   },
              // })}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNavigator"
              component={BottomNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    //if user is logged in they should see this screens
    if (loggedIn) {
      return (
        <View style={styles.loading}>
          <Text>User is Loggged In</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
