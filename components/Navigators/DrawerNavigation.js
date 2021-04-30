import React from "react";
import { View, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/main/Profile/Profile";
import EditProfile from "../screens/main/Profile/EditProfile";
import Followers from "../screens/main/Profile/Followers";
import Followings from "../screens/main/Profile/Followings";

export default function DrawerNavigation() {
  //
  const Drawer = createDrawerNavigator();

  //
  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={() => navigation.navigate("Notifications")}
          title="Go to notifications"
        />
      </View>
    );
  }

  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  //

  //
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Followers" component={Followers} />
      <Drawer.Screen name="Followings" component={Followings} />
    </Drawer.Navigator>
  );
}
