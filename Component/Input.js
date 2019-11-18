import React from "react";
import { TextInput, Dimensions } from "react-native";
let { width, height } = Dimensions.get("screen");

const Button = props => {
  const styles = {
    input: {
      backgroundColor: props.color,
      width: 0.725 * width,
      height: 0.05 * height,
      borderRadius: 35,
      marginTop: 0.02 * height,
      textAlign: "center",
      // fontFamily: "Futura",
      fontSize: 18
      // fontWeight: "bold"
    }
  };
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor={props.textColor}
      value={props.value}
      onChangeText={text => props.onChange(text, props.name)}
      name={props.name}
    />
  );
};

export default Button;
