import React from "react";
import { StyleSheet, Image } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "../screens/main/Feed/Feed";
// import Books from "../screens/main/Books";
import Dummy from "../screens/main/Dummy";
import Explore from "../screens/main/Explore";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DrawerNavigation from "./DrawerNavigation";
import BookSearchStack from "./BookSearchStackScreens";
const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#fff" }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => (
            // <FontAwesome name="user" size={22} color="#2863d0" />
            <Image
              source={require("../assets/icons/home.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookSearch"
        component={BookSearchStack}
        options={{
          tabBarIcon: ({ color }) => (
            // <FontAwesome name="search" size={22} color="#2863d0" />
            <Image
              source={require("../assets/icons/search.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Books"
        component={Books}
        options={{
          tabBarIcon: ({ color }) => (
            // <FontAwesome name="book" size={22} color="#2863d0" />
            <Image
              source={require("../assets/icons/book.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Dummy"
        component={Dummy}
        options={{
          tabBarIcon: ({ color }) => (
            // <FontAwesome name="user" size={22} color="#2863d0" />
            <Image
              source={require("../assets/icons/plus.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            // <FontAwesome name="plus" size={22} color="#2863d0" />
            <Image
              source={require("../assets/icons/grid1.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={DrawerNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            // <FontAwesome name="user" size={22} color="#2863d0" />
            <Image
              source={require("../assets/icons/user.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
});
