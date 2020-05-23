import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  Alert
} from "react-native";
import Beit from "../assets/Beit.png";
import location from "../assets/locationsign.png";
let { height, width } = Dimensions.get("window");
const SingleOrderAdmin = props => {
  const [isShow, setIsShow] = useState(false);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({ name: "", phone: "", location: "" });
  const [order, setOrder] = useState("");
  const [count, setCount] = useState(0);

  return (
    <View style={{ marginTop: 50 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            setIsShow(true);
          }}
          style={styles.containerImage}
        >
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.image}
            source={Beit}
          />
        </TouchableOpacity>
        <View style={styles.data}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Thanks",
                "Added to truck!",
                [
                  {
                    text: "Ok",
                    style: "default"
                  }
                ],
                { cancelable: false }
              )
            }
            style={styles.date}
          >
            <Text style={styles.text}>NAME: {props.name}</Text>
            <Text style={styles.text}>DATE: {props.date}</Text>
            <Text style={styles.text}>PHONE: {props.phone}</Text>
          </TouchableOpacity>

          <View style={styles.paid}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.google.com/maps/search/?api=1&query=33.896062, 35.479283"
                )
              }
              style={styles.location}
            >
              <Image
                style={styles.image}
                source={location}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Modal transparent={true} animationType="slide" visible={isShow}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                setIsShow(false);
              }}
            >
              <Image
                source={Beit}
                style={styles.imageModal}
                resizeMode="contain"
                resizeMethod="resize"
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default SingleOrderAdmin;
const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F7AE21"
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
    backgroundColor: "#008D78",
    justifyContent: "center",
    alignItems: "center"
  },
  data: {
    width: 0.725 * width,
    height: 100,
    borderRadius: 35,
    backgroundColor: "#F7AE21",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  date: {
    width: (0.725 * width) / 2 + 0.3 * ((0.725 * width) / 2),
    justifyContent: "center",
    marginLeft: 11
  },
  paid: {
    width: (0.725 * width) / 2 - 0.3 * ((0.725 * width) / 2),
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontFamily: "Futura",
    fontSize: 17,
    fontWeight: "bold"
  },
  location: {
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    backgroundColor: "#008D78",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  },
  imageModal: {
    height: height - 100,
    width,
    backgroundColor: "#008D78"
  },
  modal: {
    backgroundColor: "black",
    height,
    width,
    justifyContent: "center",
    alignItems: "center"
  }
});
