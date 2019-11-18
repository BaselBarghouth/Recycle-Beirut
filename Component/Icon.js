import React from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
let { width, height } = Dimensions.get("screen");
import shajera1 from "../assets/shajara1.png";
import shajera from "../assets/shajera.png";
import Animation from "../Component/Animation";
import cloud from "../assets/cloud.png";
const Icon = props => {
  return (
    <View style={styles.container}>
      <View style={styles.imageLetf}>
        <Image style={styles.image} source={shajera1} resizeMode="stretch" />
      </View>
      <Animation
        start={{ x: 3 * width + 150, y: 0 }}
        end={{ x: -150, y: 0 }}
        image={cloud}
        width={150}
        height={100}
        style={{ backgroundColor: "blue" }}
      />
      <View style={styles.imageRight}>
        <Image style={styles.image} source={shajera1} resizeMode="stretch" />
      </View>
    </View>
  );
};

export default Icon;
const styles = StyleSheet.create({
  container: {},
  image: { height: 50, width: 100 },
  imageLetf: {},
  imageRight: {}
});
