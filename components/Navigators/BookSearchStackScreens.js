import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Books from "../screens/main/BookSearch/Books";
import BookCard from "../screens/main/BookSearch/BookCard";
import BookCategories from "../screens/main/BookSearch/BookCategories";
import CategoryList from "../screens/main/BookSearch/CategoryList";
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
        options={{ headerShown: true }}
        options={({ navigation }) => ({
          title: "Book Details",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 2,
          },
        })}
      />
      <Stack.Screen
        name="BookCategories"
        component={BookCategories}
        options={({ navigation }) => ({
          title: "All Books",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
        })}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryList}
        options={({ navigation }) => ({
          title: "Books",
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
