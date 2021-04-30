import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { windowHeight, windowWidth } from "../../constants/Dimensions";

import { FontAwesome } from "@expo/vector-icons";

const SocialButtons = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgcolor = backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: bgcolor }]}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          style={styles.icon}
          name={btnType}
          size={22}
          color={color}
        />
      </View>
      <View style={styles.btnTextWrapper}>
        <Text style={(styles.buttonText, { color: color })}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 8,
    width: "100%",
    height: windowHeight / 15,
    padding: 10,
    flexDirection: "row",
    borderRadius: 3,
  },
  iconWrapper: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontWeight: "bold",
  },
  btnTextWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: "Regular",
  },
});
