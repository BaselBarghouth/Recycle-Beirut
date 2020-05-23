import React, { Component } from "react";
import { TouchableOpacity, Text, Dimensions, Button } from "react-native";
let { width, height } = Dimensions.get("screen");
const Buttons = props => {
  const styles = {
    button: {
      backgroundColor: props.color,
      width: 0.4 * width,
      height: 0.05 * height,
      borderRadius: 35,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0.02 * height,
      color: props.textColor
    }
  };
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.clicked}
    >
      <Text
        style={{
          color: props.textColor,
          fontFamily: "Futura",
          fontSize: 18,
          fontWeight: "bold"
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;
