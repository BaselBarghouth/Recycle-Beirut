import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Content from "../Component/Content";
import Signup from "../Pages/Signup";
import Drag from "../Component/Drag";
import Signin from "./Signin";
import sh from "../assets/shajaratahettahetyasar.png";
import mm from "../assets/shajaratahettahetyameen.png";
let { height, width } = Dimensions.get("screen");
const Left = props => {
  let user = props.user;
  let components = [
    <Signup user={user} {...props} />,
    <Content color="#F7AE21" />,
    <Content color="#008D78" />,
    <Content color="#F7AE21" />
  ];
  let colors = ["#008D78", "#F7AE21", "#008D78", "#F7AE21"];
  let titles = ["EIDT ACCOUNT", "ABOUT US", "CONTACT US", "ABOUT ART SPOT"];
  return (
    <View style={{ marginTop: 20 }}>
      <Drag components={components} colors={colors} titles={titles} />
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
      <View
        style={{
          position: "absolute",
          top: height - 0.16 * height,
          zIndex: -1,
          right: 0
        }}
      >
        <Image
          resizeMode="stretch"
          resizeMethod="resize"
          style={{ height: 0.16 * height, width: 0.28 * width }}
          source={mm}
        />
      </View>
    </View>
  );
};

export default Left;
