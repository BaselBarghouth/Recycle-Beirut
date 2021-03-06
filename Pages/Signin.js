import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  PixelRatio,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { Actions } from "react-native-router-flux";
import Input from "../Component/Input";
import Button from "../Component/Button";
import logo from "../assets/RecycleBeirutlogo.png";
import right from "../assets/shajarayamenfo2.png";
import left from "../assets/shajarayasarfo2.png";
import Animation from "../Component/Animation";
import cloud from "../assets/gheme.png";
import down from "../assets/shajarayasartahet.png";

let { height, width } = Dimensions.get("window");
const RATIO = PixelRatio.getPixelSizeForLayoutSize(height) / height;
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  onChange = (text, name) => {
    this.setState({
      [name]: text
    });
  };
  render() {
    return (
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            <View style={styles.top}>
              <View style={styles.right}>
                <Image
                  resizeMode="stretch"
                  resizeMethod="resize"
                  source={right}
                  style={{ height: 0.16 * height, width: 0.47 * width }}
                />
              </View>

              <View style={styles.logo}>
                <Image
                  source={logo}
                  style={{ height: 0.14 * height, width: 0.62 * width }}
                  resizeMode="contain"
                  resizeMethod="resize"
                />
              </View>
              <View style={styles.left}>
                <Image
                  resizeMode="stretch"
                  resizeMethod="resize"
                  source={left}
                  style={{ height: 0.16 * height, width: 0.28 * width }}
                />
              </View>
              <View style={styles.down}>
                <Image
                  resizeMode="stretch"
                  resizeMethod="resize"
                  source={down}
                  style={{ height: 0.14 * height, width: 0.4 * width }}
                />
              </View>
              <Animation
                image={cloud}
                height={0.06 * height}
                width={0.3 * width}
                start={{ x: width, y: 0.1 * height }}
                end={{ x: -0.3 * width, y: 0.1 * height }}
              />
              <Animation
                image={cloud}
                height={0.06 * height}
                width={0.3 * width}
                start={{ x: -0.3 * width, y: 0.32 * height }}
                end={{ x: width, y: 0.32 * height }}
              />
            </View>
            <View style={styles.botton}>
              <View style={styles.input}>
                <Input
                  color="#F7AE21"
                  placeholder="EMAIL"
                  textColor="white"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />

                <Input
                  color="#F7AE21"
                  placeholder="PASSWORD"
                  textColor="white"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.button}>
            <Button
              color="#F7AE21"
              title="SIGN IN"
              clicked={Actions.Home}
              textColor="white"
            />
            <Button
              color="#F7AE21"
              clicked={Actions.Signup}
              title="SIGN UP"
              textColor="white"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Signin;
const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: "#008D78"
  },
  top: {
    height: 0.5 * height,
    width,
    backgroundColor: "#F7AE21",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  botton: {
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    marginTop: 0.02 * height
  },
  button: {
    marginTop: 0.05 * height,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    position: "absolute",
    zIndex: 2,
    left: 0.19 * width,
    top: 0.23 * height
  },
  right: { position: "absolute", right: 0, top: 0.05 * height, zIndex: 1 },
  left: { position: "absolute", top: 0.05 * height, zIndex: 1 },
  down: {
    position: "absolute",
    top: 0.34 * height,
    zIndex: 1
  }
});
