import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking
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
  useEffect(() => {
    setOrder(props.order);
    let temp = props.order,
      user_id = temp.user_id,
      user1 = fetch(`http://192.168.1.107:5001/users/${user_id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => setUser(data.data[0]))
        .catch(err => console.log("err", err));
  }, [count]);

  return (
    <View style={{ marginTop: 50 }}>
      <View style={styles.container}>
        <TouchableOpacity
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
          <View style={styles.date}>
            <Text style={styles.text}>NAME: {user.name}</Text>
            <Text style={styles.text}>DATE: {order.order_date}</Text>
            <Text style={styles.text}>PHONE: {user.phone}</Text>
          </View>

          <View style={styles.paid}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`http://${user.location}`)}
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
    marginTop: 10,
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
    flexDirection: "row"
  },
  date: {
    width: (0.725 * width) / 2 + 0.3 * ((0.725 * width) / 2),
    justifyContent: "center"
  },
  paid: {
    width: (0.725 * width) / 2 - 0.3 * ((0.725 * width) / 2),
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontFamily: "Futura",
    fontSize: 18,
    fontWeight: "bold"
  },
  location: {
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    backgroundColor: "#008D78",
    justifyContent: "center",
    alignItems: "center"
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
