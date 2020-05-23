import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  PixelRatio,
  Image,
  Alert,
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
    this.state = { user: null, id: null };
  }

  componentWillMount() {
    let user = this.props.user;

    this.setState({ user });
  }
  onPress = () => {
    Alert.alert(
      "Thanks",
      "Thanks for your cooperation!",
      [
        {
          text: "Ok",
          style: "default"
        }
      ],
      { cancelable: false }
    );
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    let body = {
      user_id: this.state.user.user_id,
      order_status: "pendding",
      order_date: today
    };
    let addRecycle = fetch(`http://192.168.1.107:5001/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        let lastId = data.data.stmt.lastID;
        let payment = {
          order_id: lastId,
          payment_status: "pendding",
          payment_date: today
        };
        let addPayment = fetch(`http://192.168.1.107:5001/payments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payment)
        })
          .then(response => response.json())
          .then(data => {
            data.success
              ? Alert.alert(
                  "Thanks",
                  "Thanks for your cooperation!",
                  [
                    {
                      text: "Ok",
                      style: "default"
                    }
                  ],
                  { cancelable: false }
                )
              : Alert.alert(
                  "Error network",
                  "Please try again later!",
                  [
                    {
                      text: "Ok",
                      style: "cancel"
                    }
                  ],
                  { cancelable: false }
                );
          });
      })
      .catch(err => console.log(err));
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
            <TouchableOpacity onPress={this.onPress}>
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
            Press up there on the recycling icon and we will contact you as soon
            as possible
          </Text>
          <TouchableOpacity>
            {/* <Image
              resizeMode="contain"
              source={logo}
              style={{ height: 50, width: 50 }}
            /> */}
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
    width: "80%",
    textAlign: "center",
    color: "white",
    fontFamily: "Futura",
    fontSize: 18,
    fontWeight: "bold"
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
