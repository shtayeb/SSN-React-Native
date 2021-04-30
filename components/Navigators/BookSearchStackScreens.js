import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Books from "../screens/main/Books";
import BookCard from "../screens/main/BookCard";

const Stack = createStackNavigator();
const BookSearchStackScreens = () => {
  return (
    <Stack.Navigator initialRouteName="BookCard">
      <Stack.Screen
        name="BookCard"
        component={BookCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleBooks"
        component={Books}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Test"
        component={() => (
          <View>
            <Text>New Stack Screen</Text>
          </View>
        )}
        options={({ navigation }) => ({
          title: "Single Book",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
        })}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default BookSearchStackScreens;
