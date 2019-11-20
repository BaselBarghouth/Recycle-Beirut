import React from "react";
import { Text, View, Dimensions, Image, StyleSheet } from "react-native";
import Beit from "../assets/Beit.png";
let { height, width } = Dimensions.get("window");
const SingleOrderUser = props => {
  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    image: {
      height: 50,
      width: 50,
      marginBottom: 5
    },
    containerImage: {
      height: 75,
      width: 75,
      borderRadius: 75 / 2,
      backgroundColor: "#F7AE21",
      justifyContent: "center",
      alignItems: "center"
    },
    data: {
      width: 0.725 * width,
      height: 0.05 * height,
      borderRadius: 35,
      backgroundColor: "#F7AE21",
      flexDirection: "row",
      marginTop: (75 - 0.05 * height) / 2
    },
    date: {
      width: (0.725 * width) / 2 + 0.25 * ((0.725 * width) / 2),
      justifyContent: "center",
      marginLeft: 15
    },
    paid: {
      width: (0.725 * width) / 2 - 0.25 * ((0.725 * width) / 2),
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontFamily: "Futura",
      fontSize: 15,
      fontWeight: "bold"
    },
    text1: {
      color: "black",
      fontFamily: "Futura",
      fontSize: 15
    },
    text2: {
      color: props.color,
      fontFamily: "Futura",
      fontSize: 15
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={styles.image}
          source={Beit}
        />
      </View>
      <View style={styles.data}>
        <View style={styles.date}>
          <Text style={styles.text}>
            DATE: <Text style={styles.text1}>{props.date}</Text>
          </Text>
        </View>

        <View style={styles.paid}>
          <Text style={styles.text}>
            PAID: <Text style={styles.text2}>{props.price}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SingleOrderUser;
