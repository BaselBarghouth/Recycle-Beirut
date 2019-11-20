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
  Keyboard,
  Modal
} from "react-native";
import { Actions } from "react-native-router-flux";
import Input from "../Component/Input";
import Button from "../Component/Button";
import location from "../assets/locationsign.png";
import { debounce } from "lodash";
import MapView, { ProviderPropType } from "react-native-maps";
import { findPlaceFromLatLng } from "../google.service";
import mapMarker from "../assets/map-marker.png";
import Beit from "../assets/Beit.png";
const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
let { height, width } = Dimensions.get("screen");
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      name: null,
      confirmPassword: null,
      phone: null,
      location: null,
      user_id: null,
      role_id: null,
      region: {
        latitude: 33.88561240400549,
        longitude: 35.49511123451916,
        latitudeDelta,
        longitudeDelta
      },
      isPanding: false,
      isShow: false,
      isCreating: true
    };
    this.onPanDrag = debounce(this.onPanDrag, 1000, {
      leading: true,
      trailing: false
    });
  }
  onChange = (text, name) => {
    this.setState({
      [name]: text
    });
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta,
          longitudeDelta
        };
        this.onRegionChangeComplete(region);
      },
      error => {
        console.log(JSON.stringify(error));
      },
      { enableHighAccuracy: false }
    );
  }

  onRegionChangeComplete = async region => {
    const { data } = await findPlaceFromLatLng(
      `${region.latitude},${region.longitude}`
    );
    let stmt = `www.google.com/maps/search/?api=1&query=${this.state.region.latitude},${this.state.region.longitude}`;
    const newState = {
      region,
      isPanding: false,
      location: stmt
    };
    if (data.status === "OK") {
      newState.text = data.results[0].formatted_address;
    }
    this.setState(newState, () => console.log(this.state));
  };
  onPanDrag = () => {
    const { isPanding } = this.state;
    if (isPanding) {
      return;
    }
    this.setState({
      isPanding: true
    });
  };
  creatAccount = () => {
    if (
      this.state.name == null ||
      this.state.email == null ||
      this.state.password == null ||
      this.state.phone == null ||
      this.state.confirmPassword == null ||
      this.state.location == null
    ) {
      Alert.alert(
        "Error information",
        "Please fill the information before",
        [
          {
            text: "Cancel",
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else if (this.state.password != this.state.confirmPassword) {
      Alert.alert(
        "Error information",
        "Please match the password",
        [
          {
            text: "Cancel",
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      let body = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        phone: this.state.phone,
        location: this.state.location,
        role_id: this.state.isCreating ? 3 : this.state.role_id
      };
      let addUser = fetch(
        `http://192.168.1.107:5001/users${
          this.state.isCreating ? "" : "/" + this.state.user_id
        }`,
        {
          method: this.state.isCreating ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      )
        .then(response => response.json())
        .then(data => {
          if (this.state.isCreating) {
            let user_id = data.data.stmt.lastID,
              getUserData = fetch(
                `http://192.168.1.107:5001/users/${user_id}`,
                {
                  method: "Get",
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              )
                .then(response => response.json())
                .then(data => {
                  data.success
                    ? Actions.Home({ user: data.data[0] })
                    : () => console.log("err");
                });
          } else {
            data.success
              ? Alert.alert(
                  "EDITING ACCOUNT",
                  "We have updated your account!\n Thank you!",
                  [
                    {
                      text: "Ok",
                      style: "cancel"
                    }
                  ],
                  { cancelable: false }
                )
              : () => console.log("err");
          }
        })
        .catch(err => console.log(err));
    }
  };
  componentWillMount() {
    if (this.props.role) {
      let {
          name,
          email,
          phone,
          location,
          password,
          user_id,
          role_id
        } = this.props.user,
        role = this.props.role;
      this.setState({
        isCreating: false,
        name,
        email,
        location,
        phone,
        password,
        role_id,
        confirmPassword: password,
        user_id
      });
    }
  }
  render() {
    const { region, isPanding } = this.state;
    const styles = StyleSheet.create({
      form: {
        height,
        width,
        backgroundColor: "#008D78",
        opacity: this.state.isShow ? 0.4 : 1
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
        fontFamily: "Futura",
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
      },
      mapWrapper: {
        overflow: "hidden",
        height: 0.5 * height,
        width: 0.8 * width
      },
      map: {
        flex: 1
      },
      marker: {
        height: 48,
        width: 48
      },
      markerFixed: {
        left: "50%",
        marginLeft: -24,
        marginTop: -48,
        position: "absolute",
        top: "50%",
        zIndex: 2,
        height: 48,
        width: 48
      },
      isPanding: {
        marginTop: -60
      },
      modal: {
        height: 0.5 * height,
        width: 0.8 * width,
        marginTop: 0.4 * height - (0.3 * height) / 2
      },
      dad: {
        justifyContent: "center",
        alignItems: "center"
      }
    });

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
                hidden={true}
                onChange={this.onChange}
                value={this.state.password}
              />
              <Input
                color="#F7AE21"
                placeholder="CONFIRM PASSWORD"
                textColor="white"
                name="confirmPassword"
                hidden={true}
                onChange={this.onChange}
                value={this.state.confirmPassword}
              />
              <Input
                color="#F7AE21"
                placeholder="PHONE NUMBER"
                textColor="white"
                name="phone"
                onChange={this.onChange}
                value={this.state.phone}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: 0.725 * width
                }}
              >
                <View
                  style={{
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ isShow: true })}
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
                <View
                  style={{
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ isShow: true })}
                    style={styles.circle}
                  >
                    <Image
                      source={Beit}
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={{ height: 0.1 * height, width: 0.1 * height }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Modal
                transparent={true}
                animationType="slide"
                visible={this.state.isShow}
              >
                <View style={styles.dad}>
                  <View style={styles.modal}>
                    <View style={styles.mapWrapper}>
                      <MapView
                        provider="google"
                        ref={map => (this.map = map)}
                        initialRegion={region}
                        style={styles.map}
                        showsUserLocation={true}
                        followUserLocation={true}
                        loadingEnabled={true}
                        onPanDrag={this.onPanDrag}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                        rotateEnabled={true}
                        showsMyLocationButton={true}
                      />
                    </View>
                    <View
                      style={[
                        styles.markerFixed,
                        isPanding ? styles.isPanding : null
                      ]}
                      pointerEvents="none"
                    >
                      <Image
                        style={styles.marker}
                        resizeMode="contain"
                        source={mapMarker}
                      />
                    </View>
                  </View>
                  <View style={styles.down}>
                    <Button
                      color="#6BBD45"
                      title="ADD LOCATION"
                      textColor="white"
                      style={{ width: 0.725 * width }}
                      clicked={() => this.setState({ isShow: false })}
                    />
                    <Button
                      color="#6BBD45"
                      title="BACK"
                      textColor="white"
                      style={{ width: 0.725 * width }}
                      clicked={() => this.setState({ isShow: false })}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.down}>
              <Button
                color="#6BBD45"
                title={this.state.isCreating ? "CREATE ACCOUNT" : "SAVE"}
                textColor="white"
                style={{ width: 0.725 * width }}
                clicked={this.creatAccount}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Signup;
