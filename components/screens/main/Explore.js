import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Explore() {
  return (
    <View style={styles.screen}>
      <Text>Explore Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
});
