import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "../screens/auth/Landing";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";

import { AppConsumer } from "../Context/MyContext";

import BottomNavigator from "./BottomNavigator";

const Stack = createStackNavigator();

export default class AppNavigator extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    // if user in not logged in they should see these pages
    return (
      <AppConsumer>
        {(value) => {
          if (!value.loggedIn) {
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
          if (value.loggedIn) {
            return (
              <NavigationContainer>
                <Stack.Navigator initialRouteName="BottomNavigator">
                  <Stack.Screen
                    name="BottomNavigator"
                    component={BottomNavigator}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            );
          }
        }}
      </AppConsumer>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
