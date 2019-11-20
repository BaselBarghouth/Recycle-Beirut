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
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import Button from "../Component/Button";
import logo from "../assets/RecycleBeirutlogo.png";
import right from "../assets/shajarayamenfo2.png";
import left from "../assets/shajarayasarfo2.png";
import Animation from "../Component/Animation";
import cloud from "../assets/gheme.png";
import down from "../assets/shajarayasartahet.png";
let { height, width } = Dimensions.get("window");
class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = (text, name) => {
    this.setState({
      [name]: text
    });
  };
  componentWillMount() {
    // console.log(this.props);
  }
  render() {
    return (
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
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
          <View style={styles.button}>
            <Button
              color="#F7AE21"
              title="PlACE TRUCK"
              clicked={Actions.Orders}
              textColor="white"
              style={{ width: 0.7 * width }}
            />
            <Button
              color="#F7AE21"
              title="EDIT USERS"
              clicked={Actions.Users}
              textColor="white"
              style={{ width: 0.7 * width }}
            />
            <Button
              color="#F7AE21"
              title="TRUCKS HISTORY"
              clicked={Actions.History}
              textColor="white"
              style={{ width: 0.7 * width }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default HomeAdmin;
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
