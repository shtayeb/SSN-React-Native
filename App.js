import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppNavigator from "./components/Navigators/Navigator";
import AppLoading from "expo-app-loading";
import { AppProvider } from "./components/Context/MyContext";
import { FontAwesome } from "@expo/vector-icons";
export default class App extends React.Component {
  state = {
    isFontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      Bold: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
      Medium: require("./assets/fonts/Montserrat-Medium.ttf"),
      Regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    });
    await Font.loadAsync(FontAwesome.font);
    this.setState({ isFontLoaded: true });
  }
  render() {
    return this.state.isFontLoaded ? (
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    ) : (
      <AppLoading />
    );
  }
}
