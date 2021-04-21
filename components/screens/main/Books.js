import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Books() {
  return (
    <View style={styles.screen}>
      <Text>This is the Books</Text>
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
