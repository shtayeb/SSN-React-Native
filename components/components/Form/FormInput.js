import React from "react";
import { StyleSheet, TextInput, View, Image } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../../constants/Dimensions";
export default function FormInput({
  labelValue,
  placeholderText,
  iconType,
  ...rest
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        {/* <AntDesign name={iconType} color="#666" /> */}
        {iconType === "user" ? (
          <Image
            source={require("../../assets/icons/user.png")}
            style={{ width: 25, height: 25 }}
          />
        ) : (
          <Image
            source={require("../../assets/icons/lock.png")}
            style={{ width: 25, height: 25 }}
          />
        )}
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 8,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    // fontFamily: "Regular",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
