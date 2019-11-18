import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  PixelRatio,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from "react-native";
import Input from "../Component/Input";
import Button from "../Component/Button";
import logo from "../assets/artspotlogo.png";
import right from "../assets/shajarayamenfo2.png";
import left from "../assets/shajarayasarfo2.png";
import Animation from "../Component/Animation";
import cloud from "../assets/gheme.png";
import down from "../assets/shajarayasartahet.png";
import recycle from "../assets/recycle.png";
let { height, width } = Dimensions.get("window");
const RATIO = PixelRatio.getPixelSizeForLayoutSize(height) / height;
class Home extends Component {
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
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.right}>
            <Image
              resizeMode="stretch"
              resizeMethod="resize"
              source={right}
              style={{ height: 0.16 * height, width: 0.47 * width }}
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
          <View style={styles.circle}>
            <TouchableOpacity>
              <Image
                source={recycle}
                resizeMethod="resize"
                resizeMode="stretch"
                style={{ height: 0.16 * height, width: 0.16 * height }}
              />
            </TouchableOpacity>
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
            start={{ x: -0.3 * width, y: 0.4 * height }}
            end={{ x: width, y: 0.4 * height }}
          />
        </View>
        <View style={styles.botton}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          </Text>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              source={logo}
              style={{ height: 50, width: 50 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Home;
const styles = StyleSheet.create({
  container: {
    height,
    maxWidth: width,
    backgroundColor: "#008D78",
    overflow: "hidden"
  },
  top: {
    height: 0.6 * height,
    width,
    backgroundColor: "#F7AE21",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  botton: {
    width,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  circle: {
    borderWidth: 7,
    height: 0.2 * height,
    width: 0.2 * height,
    borderRadius: (0.2 * height) / 2,
    borderColor: "white",
    marginBottom: 0.15 * height,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: (width - 0.2 * height) / 2
  },
  text: {
    width: "60%",
    textAlign: "center"
    // fontFamily: "Futura"
  },
  right: {
    position: "absolute",
    height: 0.16 * height,
    width: 0.47 * width,
    top: 0.05 * height,
    right: 0,
    zIndex: 1
  },
  left: { position: "absolute", top: 0.05 * height, left: 0, zIndex: 1 },
  down: {
    position: "absolute",
    bottom: 0,
    left: 1,
    zIndex: 1
  }
});
