import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function BookSearch() {
  return (
    <View style={styles.screen}>
      <Text>Book Search</Text>
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
