import React from "react";
import { Text, View, Dimensions, FlatList } from "react-native";
import Left from "./Left";
let { height, width } = Dimensions.get("screen");
import Clicked from "./Clicked";
export default function Home() {
  let data = [
    <Left />,
    <Clicked />,
    <View style={{ height: "100%", backgroundColor: "blue" }}></View>
  ];
  return (
    <FlatList
      pagingEnabled={true}
      data={data}
      horizontal={true}
      initialScrollIndex={1}
      getItemLayout={(data, index) => ({
        length: width,
        offset: width * index,
        index
      })}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={{ height, width }}>{item}</View>
      )}
    />
  );
}
