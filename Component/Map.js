import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableHighlight
} from "react-native";

import { debounce } from "lodash";

import MapView, { Marker, ProviderPropType } from "react-native-maps";
import PriceMarker from "./PriceMarker";
import { findPlaceFromLatLng } from "../google.service";
import mapMarker from "../assets/map-marker.png";
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

const colors = {
  white: "#ffffff",
  blue1: "#0278c4",
  blue2: "rgba(2, 120, 196, 0.3)",
  blue3: "#007aff",
  blue4: "rgba(17, 118, 196, 0.05)",
  blue5: "#ebf5fb",
  gray1: "#eeeeee",
  gray2: "#585858",
  gray3: "#cfcfd1",
  gray4: "#9099a0",
  gray5: "#545454",
  gray6: "#dddddd",
  gray7: "#f9f9f9",
  gray8: "#ededed",
  gray9: "#f6f6f6",
  gray10: "#9b9b9b",
  gray11: "#cccccc",
  gray12: "#cfcfcf",
  gray13: "#d8d8d8",
  gray14: "rgba(41, 65, 155, 0.1)",
  gray15: "#48555e",
  gray16: "rgba(0, 0, 0, 0.06)",
  gray17: "#fafafa",
  gray18: "#fafaf8",
  gray19: "#e5e5e5",
  gray20: "rgba(0, 0, 0, 0.1)",
  gray21: "#e4e5e6",
  gray22: "#e8e7e4",
  gray23: "rgba(0, 0, 0, 0.15)",
  gray24: "rgba(0, 0, 0, 0.38)",
  gray25: "rgba(23, 35, 40, 0.12)",

  graytest: "#d5d7d8",

  black1: "#000000",
  black2: "#172328",
  red1: "#d0011b",
  red2: "#de4d5f",
  red3: "#de4c5e",
  red4: "#ff3b30",
  red5: "#d0021b",
  orange1: "#f6a623",
  green1: "#4cd964",
  green2: "#56970b"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    position: "relative"
  },
  mapWrapper: {
    flex: 1,
    height: 400,
    overflow: "hidden"
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
  textSearch: {
    alignItems: "center",
    position: "absolute",
    flex: 1,
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexWrap: "nowrap"
  },
  text: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
    height: 40,
    padding: 8,
    borderWidth: 0,
    backgroundColor: "white",
    alignItems: "center"
  }
});

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

class MarkerTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 10.780889,
        longitude: 106.629271,
        latitudeDelta,
        longitudeDelta
      },
      isPanding: false,
      openModal: false
    };
    this.onPanDrag = debounce(this.onPanDrag, 1000, {
      leading: true,
      trailing: false
    });
  }

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
    const newState = {
      region,
      isPanding: false
    };
    if (data.status === "OK") {
      newState.text = data.results[0].formatted_address;
    }
    this.setState(newState);
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

  render() {
    const { region, isPanding, text, openModal } = this.state;
    return (
      <View style={styles.container}>
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
          />
        </View>
        <View
          style={[styles.markerFixed, isPanding ? styles.isPanding : null]}
          pointerEvents="none"
        >
          <Image
            style={styles.marker}
            resizeMode="contain"
            source={mapMarker}
          />
        </View>

        <View style={styles.textSearch}>
          <TouchableHighlight
            onPress={() => {
              this.setState({
                openModal: true
              });
            }}
          >
            <View style={styles.text}>
              <Text>{text}</Text>
            </View>
          </TouchableHighlight>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={openModal}
          onRequestClose={() => {
            this.setState({
              openModal: false
            });
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>This is modal search Google Places!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    openModal: false
                  });
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

MarkerTypes.propTypes = {
  provider: ProviderPropType
};

export default MarkerTypes;
