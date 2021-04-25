import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "../screens/main/Feed";
import Books from "../screens/main/Books";
import Profile from "../screens/main/Profile";
import BookSearch from "../screens/main/BookSearch";
import Explore from "../screens/main/Explore";
import { FontAwesome } from "@expo/vector-icons";
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
            <FontAwesome name="user" size={22} color="#2863d0" />
          ),
        }}
      />
      <Tab.Screen
        name="BookSearch"
        component={BookSearch}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={22} color="#2863d0" />
          ),
        }}
      />
      <Tab.Screen
        name="Books"
        component={Books}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={22} color="#2863d0" />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" size={22} color="#2863d0" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={22} color="#2863d0" />
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
