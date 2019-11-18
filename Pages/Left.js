import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Content from "../Component/Content";
import Signup from "../Pages/Signup";
import Drag from "../Component/Drag";
import Signin from "./Signin";
import sh from "../assets/shajarayasartahet.png";
let { height, width } = Dimensions.get("screen");
const Left = () => {
  let components = [
    <Signup />,
    <Content color="#F7AE21" />,
    <Content color="#008D78" />,
    <Content color="#F7AE21" />
  ];
  let colors = ["#008D78", "#F7AE21", "#008D78", "#F7AE21"];
  return (
    <View>
      <Drag components={components} colors={colors} />
      <View
        style={{
          position: "absolute",
          top: height - 0.16 * height,
          zIndex: -1
        }}
      >
        <Image
          resizeMode="stretch"
          resizeMethod="resize"
          style={{ height: 0.16 * height, width: 0.28 * width }}
          source={sh}
        />
      </View>
    </View>
  );
};

export default Left;
