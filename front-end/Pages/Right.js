import React from "react";
import { Text, View, Dimensions, StyleSheet, ScrollView } from "react-native";
import SingleOrderUser from "../Component/SingleOrderUser";
let { height, width } = Dimensions.get("window");
class Right extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let user = this.props.user;
    let check = fetch(`http://192.168.1.107:5001/v1/users/orders`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log("err", err));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.text}>-10$</Text>
        </View>
        <ScrollView>
          <SingleOrderUser date="18/9/2019" price="0$" color="red" />
          <SingleOrderUser date="30/9/2019" price="10$" color="#6BBD45" />
          <SingleOrderUser date="2/10/2019" price="0$" color="red" />
          <SingleOrderUser date="6/10/2019" price="0$" color="red" />
          <SingleOrderUser date="9/10/2019" price="10$" color="#6BBD45" />
          <SingleOrderUser date="18/10/2019" price="0$" color="red" />
          <SingleOrderUser date="2/11/2019" price="10$" color="#6BBD45" />
          <SingleOrderUser date="9/11/2019" price="10$" color="#6BBD45" />
          <SingleOrderUser date="18/11/2019" price="0$" color="red" />
        </ScrollView>
      </View>
    );
  }
}

export default Right;
const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: "#008D78"
  },
  top: {
    height: 0.3 * height,
    backgroundColor: "#F7AE21",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center"
  },
  text: {
    color: "red",
    fontFamily: "Futura",
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center"
  }
});
