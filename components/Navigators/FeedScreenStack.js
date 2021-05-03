import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../screens/main/Feed/Feed";
import FeedProfile from "../screens/main/Feed/FeedProfile";
const Stack = createStackNavigator();
const BookSearchStackScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="User's Profile"
        component={FeedProfile}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{ headerShown: true }}
        options={({ navigation }) => ({
          title: "Feed",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 2,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default BookSearchStackScreens;
