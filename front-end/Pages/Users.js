import React from "react";
import { Text, View, Dimensions, StyleSheet, ScrollView } from "react-native";
import SingleOrderUser from "../Component/SingleOrderUser";
let { height, width } = Dimensions.get("window");
import SingleUser from "../Component/SingleUser";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }
  componentDidMount() {
    let check = fetch(`http://192.168.1.107:5001/users`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data.data });
      })
      .catch(err => console.log("err", err));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.text}>EDIT USERS</Text>
        </View>
        <ScrollView>
          {this.state.users.map((user, index) => {
            return <SingleUser user={user} key={index} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Users;
const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: "#008D78"
  },
  top: {
    height: 0.2 * height,
    backgroundColor: "#F7AE21",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontFamily: "Futura",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center"
  }
});
