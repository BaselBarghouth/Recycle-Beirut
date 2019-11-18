import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import Input from "../Component/Input";
import Button from "../Component/Button";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import location from "../assets/locationsign.png";
let { height, width } = Dimensions.get("screen");
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      phonNumber: "",
      location: ""
    };
  }
  onChange = (text, name) => {
    this.setState({
      [name]: text
    });
  };
  locationPicker = async () => {
    const verifyPermissions = async () => {
      const result = await Permissions.askAsync(Permissions.LOCATION);
      if (result.status !== "granted") {
        Alert.alert(
          "Insufficient permissions!",
          "You need to grant location permissions to use this app.",
          [{ text: "Okay" }]
        );
        return false;
      }
      return true;
    };

    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });

      let stmt = `https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`;
      console.log(stmt);
      this.setState({ location: stmt });
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please try again later", [
        { text: "Okay" }
      ]);
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.form}>
          <View style={styles.up}>
            <Text style={styles.text}>CREATING NEW ACCOUNT</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.middle}>
              <Input
                color="#F7AE21"
                placeholder="NAME"
                textColor="white"
                name="name"
                onChange={this.onChange}
                value={this.state.name}
              />
              <Input
                color="#F7AE21"
                placeholder="EMAIL"
                textColor="white"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
              <Input
                color="#F7AE21"
                placeholder="PASSWORD"
                textColor="white"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
              />
              <Input
                color="#F7AE21"
                placeholder="CONFIRM PASSWORD"
                textColor="white"
                name="confirmPassword"
                onChange={this.onChange}
                value={this.state.confirmPassword}
              />
              <Input
                color="#F7AE21"
                placeholder="PHONE NUMBER"
                textColor="white"
                name="phoneNumber"
                onChange={this.onChange}
                value={this.state.phonNumber}
              />
              <View>
                <TouchableOpacity
                  onPress={this.locationPicker}
                  style={styles.circle}
                >
                  <Image
                    source={location}
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{ height: 0.1 * height, width: 0.1 * height }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.down}>
              <Button
                color="#6BBD45"
                title="CREATE ACCOUNT"
                textColor="white"
                style={{ width: 0.725 * width }}
                clicked={Actions.Home}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Signup;
const styles = StyleSheet.create({
  form: {
    height,
    width,
    backgroundColor: "#008D78"
  },

  up: {
    height: 0.15 * height,
    backgroundColor: "#F7AE21",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    textAlign: "center"
  },
  text: {
    color: "white",
    textAlign: "center",
    // fontFamily: "Futura",
    fontWeight: "bold",
    fontSize: 18
  },
  middle: {
    justifyContent: "center",
    alignItems: "center"
  },
  down: {
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    justifyContent: "space-evenly",
    flex: 1
  },
  circle: {
    height: 0.15 * height,
    width: 0.15 * height,
    borderRadius: (0.15 * height) / 2,

    marginTop: 10,
    backgroundColor: "#F7AE21",
    alignItems: "center",
    justifyContent: "center"
  }
});
