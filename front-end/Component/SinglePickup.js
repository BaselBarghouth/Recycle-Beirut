import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Linking
} from "react-native";
let { height, width } = Dimensions.get("screen");
import userIcon from "../assets/user.png";
import { Table, Row, Rows } from "react-native-table-component";
class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false};
  }
  componentWillMount() {
    let user_id = this.props.order.user_id;

    let user = fetch(`http://192.168.1.107:5001/users/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          user: data.data[0]
        })
      );
    console.log(this.props);
  }

  render() {
    const table1 = {
      tableHead: ["Name", "Phone"],
      tableData: [
        [this.state.user.name || "name", this.state.user.name || "phone"]
      ],
      isShow: false
    };
    const table2 = {
      tableHead: ["Location", "Date"],
      tableData: [
        [
          (
            <Text
              style={{ textAlign: "center", color: "black" }}
              onPress={() =>
                Linking.openURL(`http://${this.state.user.location}`)
              }
            >
              Open in Google Map
            </Text>
          ) || "location",
          this.props.order.order_date || "date"
        ]
      ],
      isShow: false
    };
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => this.setState({ isShow: true })}>
          <Image
            source={userIcon}
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              height: 112,
              width: 0.2 * width,
              backgroundColor: "#008D78"
            }}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isShow}
        >
          <TouchableOpacity
            style={styles.modal}
            onPress={() => this.setState({ isShow: false })}
          >
            <Image
              source={userIcon}
              resizeMethod="resize"
              resizeMode="contain"
              style={{
                height: 0.5 * height,
                width: 0.8 * width
              }}
            />
          </TouchableOpacity>
        </Modal>
        <View>
          <Table
            borderStyle={{ borderWidth: 1, borderColor: "#F7AE21" }}
            style={{ width: 0.8 * width }}
          >
            <Row
              data={table1.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows
              widthArr={[0.4 * width - 1, 0.4 * width]}
              heightArr={[30, 30]}
              data={table1.tableData}
              textStyle={styles.text}
              style={{ backgroundColor: "#008D78" }}
            />
          </Table>
          <Table
            borderStyle={{ borderWidth: 1, borderColor: "#F7AE21" }}
            style={{ width: 0.8 * width }}
          >
            <Row
              data={table2.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows
              widthArr={[0.4 * width - 1, 0.4 * width]}
              heightArr={[30, 30]}
              data={table2.tableData}
              textStyle={styles.text}
              style={{ backgroundColor: "#008D78" }}
            />
          </Table>
        </View>
      </View>
    );
  }
}

export default SingleUser;
const styles = StyleSheet.create({
  head: {
    height: 25,
    width: "100%",
    backgroundColor: "#6BBD45"
  },
  text: { textAlign: "center", color: "black" },
  modal: {
    marginTop: 0.25 * height,
    marginLeft: 0.1 * width
  }
});
