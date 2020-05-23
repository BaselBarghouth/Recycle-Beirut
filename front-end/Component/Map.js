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
import MapView, { ProviderPropType } from "react-native-maps";
import { findPlaceFromLatLng } from "../google.service";
import mapMarker from "../assets/map-marker.png";
const { width, height } = Dimensions.get("window");

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}
const styles = StyleSheet.create({
  container: { height: 0.5 * height, width: 0.8 * width },
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
  }
});

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

class MarkerTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 33.88561240400549,
        longitude: 35.49511123451916,
        latitudeDelta,
        longitudeDelta
      },
      isPanding: false
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

  render() {
    const { region, isPanding } = this.state;
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
            rotateEnabled={true}
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
      </View>
    );
  }
}

MarkerTypes.propTypes = {
  provider: ProviderPropType
};

export default MarkerTypes;
