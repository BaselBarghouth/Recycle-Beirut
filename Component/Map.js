import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: []
    };
  }
  fetchMarkerData() {
    fetch("https://feeds.citibikenyc.com/stations/stations.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          markers: responseJson.stationBeanList
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.fetchMarkerData();
  }
  render() {
    return <MapView re provider="google" />;
  }
}
export default Map;
