import React from "react";
import { Text, View, Dimensions, Image } from "react-native";
import Face from "../assets/facebook_logos_PNG19748.png";
import Insta from "../assets/instagram_PNG9.png";

import What from "../assets/whatsapp_PNG20.png";

let { height, width } = Dimensions.get("window");
const Content = props => {
  return (
    <View
      style={{
        height,
        width,

        backgroundColor: props.color
      }}
    >
      <View>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Futura",
            fontWeight: "bold",
            fontSize: 14,
            marginTop: 350,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          Recycle Beirut
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Futura",
            fontWeight: "bold",
            fontSize: 14,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          Address: Jnah, Down the street across from the Iranian Embassy Beirut,
          Lebanon
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Futura",
            fontWeight: "bold",
            fontSize: 14,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          Phone: +961 79 113 503
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Futura",
            fontWeight: "bold",
            fontSize: 14,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          Email: recyclebeirut@gmail.com
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Futura",
            fontWeight: "bold",
            fontSize: 14,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          Website: www.recyclebeirut.com
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "center"
        }}
      >
        <View>
          <Image
            style={{ height: 68, width: 68 }}
            resizeMethod="resize"
            resizeMode="center"
            source={Insta}
          />
        </View>
        <View>
          <Image
            style={{ height: 60, width: 60, marginLeft: 10 }}
            resizeMethod="resize"
            resizeMode="center"
            source={What}
          />
        </View>
        <View>
          <Image
            style={{ height: 60, width: 60, marginLeft: 10 }}
            resizeMethod="resize"
            resizeMode="center"
            source={Face}
          />
        </View>
      </View>
    </View>
  );
};

export default Content;
