import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/colors";

export default function Header(props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => props.goBack()}>
        <Image
          style={[styles.icon, styles.inputIcon, styles.backButton]}
          source={require("../assets/al.png")}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{props.title}</Text>
      <TouchableOpacity onPress={() => props.openDrawer()}>
        <Image
          style={[styles.icon, styles.inputIcon, styles.backButton]}
          source={require("../assets/menu.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    padding: 15,
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "space-between",
    elevation: 10,
    // marginTop: 10,
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 29,
    height: 29,
  },
  backButton: {
    marginRight: 10,
  },
});
