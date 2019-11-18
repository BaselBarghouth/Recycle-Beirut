import React from "react";
import { Text, View, Dimensions } from "react-native";
let { height, width } = Dimensions.get("window");
const Content = props => {
  return (
    <View
      style={{
        height,
        width,
        backgroundColor: props.color,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>
        zdfgbdfzbdxbcbcvxbcxvbxcvb xcvb xc backgroundColorxcvb cv xcvbxc vb
        xcbxcv
      </Text>
    </View>
  );
};

export default Content;
