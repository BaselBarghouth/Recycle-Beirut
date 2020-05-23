import React from "react";
import { Text, View, Dimensions } from "react-native";
let { height, width } = Dimensions.get("window");
const Content = props => {
  return (
    <View
      style={{
        height,
        width,

        backgroundColor: props.color
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "justify",
          fontFamily: "Futura",
          fontWeight: "bold",
          fontSize: 14,
          marginTop: 370,
          marginLeft: 20,
          marginRight: 20
        }}
      >
        Recycle Beirut is a social and environmental enterprise that works to
        create jobs for underprivileged people including Lebanese in the
        environmental sector. We serve the greater Beirut area by picking up
        recyclables from homes, businesses, and organizations. We then transfer
        them to our warehouse, sort and pack them, and send them to factories to
        be re-manufactured into new materials.Recycle Beirut is considered one
        of the leading social initiatives in the Middle East and was awarded the
        first prize at the Massachusetts Institute of Technology (MIT)
        Enterprise Forum “Innovate for Refugee” Competition in Jordan in 2016.
        Your sponsorship of our project would contribute to our core mission of
        sustainability, social stability, and economic development. Unlike most
        NGOs and social enterprises, we are not funded by the government or any
        local or international organizations. 
      </Text>
    </View>
  );
};

export default Content;
