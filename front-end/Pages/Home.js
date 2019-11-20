import React from "react";
import { Text, View, Dimensions, FlatList } from "react-native";
import Left from "./Left";
let { height, width } = Dimensions.get("screen");
import Orders from "./Orders";
import Clicked from "./Clicked";
import Users from "./Users";
import HomeAdmin from "./HomeAdmin";
import HomeDriver from "./HomeDriver";
import Right from "./Right";
export default function Home(props) {
  let role = props.user.role_id,
    user = props.user;
  let temp;
  switch (role) {
    case 1:
      temp = <HomeAdmin user={user} {...props} role={1} />;
      break;
    case 2:
      temp = <HomeDriver user={user} {...props} role={2} />;
      break;
    case 3:
      temp = [
        <Left user={user} {...props} role={3} />,
        <Clicked user={user} {...props} role={3} />,
        <Right user={user} {...props} role={3} />
      ];
      temp = (
        <FlatList
          pagingEnabled={true}
          data={temp}
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
      break;
  }

  return temp;
}
