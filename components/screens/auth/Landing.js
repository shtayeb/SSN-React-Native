import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import Card from "../../components/Card";
import NumberContainer from "../../components/NumberContainer";

export default function Landing({ navigation }) {
  return (
    <View style={styles.screen}>
      <Card style={styles.box}>
        <NumberContainer>
          <Text>Landing page</Text>
        </NumberContainer>
        <Button
          style={styles.button}
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
        <Button
          style={styles.button}
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
  },
  button: {
    margin: 5,
    padding: 5,
  },
});
