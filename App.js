import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import * as Font from "expo-font";
import AppNavigator from "./components/Navigators/Navigator";
import AppLoading from "expo-app-loading";
import { AppProvider } from "./components/Context/MyContext";

export default class App extends React.Component {
  state = {
    isFontLoaded: false,
  };
  async componentDidMount() {
    // await Font.loadAsync({
    // Bold: require("./components/fonts/Montserrat-ExtraBold.otf"),
    // Medium: require("./components/fonts/Montserrat-Medium.otf"),
    // Regular: require("./components/fonts/Montserrat-Regular.otf"),
    // });
    this.setState({ isFontLoaded: true });
  }
  render() {
    return this.state.isFontLoaded === true ? (
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    ) : (
      <AppLoading />
    );
  }
}
