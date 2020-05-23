import React, { Component } from "react";
import {
  ScrollView,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text
} from "react-native";
import SingleOrderUser from "../Component/SingleOrderUser";
import SinglePickup from "../Component/SinglePickup";
import Swipeout from "react-native-swipeout";
import truckIcon from "../assets/truck.png";
import Button from "../Component/Button";
const { width, height } = Dimensions.get("window");
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { pickup: [], index: "", truck: [], isShow: false };
  }
  componentWillMount() {
    let orders = fetch(`http://192.168.1.107:5001/v1/pickup/pickup_order`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        let ids = [];
        data.map(i => {
          ids = [...ids, i.order_id];
        });
        let orders = [];
        ids.forEach(element => {
          let getOrders = fetch(`http://192.168.1.107:5001/orders/${element}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(daya => {
              orders = [...orders, daya.data[0]];
            });
        });
        this.setState({ pickup: data }, () => console.log(this.state.pickup));
      })
      .catch(err => console.log("err", err));
  }
  render() {
    const swipeoutBtns = [
      {
        text: "DETAILES",
        backgroundColor: "#F7AE21",
        onPress: () => {}
      }
    ];
    const swipeoutBtns1 = [
      {
        text: "Remove from Truck",
        backgroundColor: "#F7AE21",
        onPress: () => {
          let { truck, index } = this.state,
            orders = [...this.state.orders, truck[index]];

          truck.splice(index, 1);
          this.setState({ truck, index: "", orders });
        }
      }
    ];
    return (
      <View>
        <View style={{ backgroundColor: "#008D78" }}>
          <View
            style={{
              height: 0.2 * height,
              backgroundColor: "#F7AE21",
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 40,
                fontFamily: "Futura",
                marginTop: 10
              }}
            >
              PICKUPS
            </Text>
          </View>
        </View>
        <ScrollView style={{ backgroundColor: "#008D78", paddingTop: 20 }}>
          <SingleOrderUser
            lolo="HAMRA"
            date="18/9/2019"
            price="BILAL HABASH"
            color="red"
          />
          <SingleOrderUser
            date="30/9/2019"
            price="AMMER SAAD"
            color="#6BBD45"
            lolo="GEITAWI"
          />
          <SingleOrderUser
            lolo="MAZRAA"
            date="2/10/2019"
            price="MAJD BSHARA"
            color="red"
          />

          <SingleOrderUser
            lolo="HAMRA"
            date="6/10/2019"
            price="AMMER SAAD"
            color="red"
          />
          <SingleOrderUser
            lolo="MAZRAA"
            date="9/10/2019"
            price="MAJD BSHARA"
            color="#6BBD45"
          />
          <SingleOrderUser
            lolo="DOWN TOWN"
            date="18/9/2019"
            price="AMMER SAAD"
            color="red"
            lp="center"
          />
          <SingleOrderUser
            lolo="MAZRAA"
            date="30/9/2019"
            price="MAJD BSHARA"
            color="#6BBD45"
          />
          <SingleOrderUser
            lolo="DOWN TOWN"
            date="2/10/2019"
            price="MUTAZ DYABIEH"
            color="red"
          />
          <SingleOrderUser
            lolo="MAZRAA"
            date="6/10/2019"
            price=""
            color="red"
          />
          <SingleOrderUser
            lolo="ACHRAFIEH"
            date="9/10/2019"
            price="BILAL HABASH"
            color="#6BBD45"
          />
        </ScrollView>
        {/* <ScrollView style={{ backgroundColor: "#008D78" }}>
          {this.state.pickup &&
            this.state.pickup.map((pickup, index) => {
              return (
                <Swipeout
                  autoClose={true}
                  style={{ marginTop: 25 }}
                  right={swipeoutBtns}
                  buttonWidth={100}
                  key={index}
                  onOpen={() => this.setState({ index: index })}
                >
                  <SinglePickup key={index} pickup={pickup} />
                </Swipeout>
              );
            })}
        </ScrollView> */}
        <TouchableOpacity
          onPress={() =>
            this.setState({
              isShow: true
            })
          }
          style={{
            position: "absolute",
            top: 0.5 * height - 50,
            zIndex: 22,
            right: 0
          }}
        >
          {/* <Image
            resizeMode="contain"
            resizeMethod="resize"
            source={truckIcon}
            style={{ height: 100, width: 100 }}
          /> */}
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isShow}
        >
          <View
            style={{
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ScrollView>
              {this.state.truck &&
                this.state.truck.map((order, index) => {
                  return (
                    <Swipeout
                      autoClose={true}
                      style={{ marginTop: 25 }}
                      right={swipeoutBtns1}
                      buttonWidth={100}
                      key={index}
                      onOpen={() => this.setState({ index: index })}
                    >
                      <SinglePickup key={index} order={order} />
                    </Swipeout>
                  );
                })}
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <View style={{ margin: 10 }}>
                  <Button
                    color="#F7AE21"
                    clicked={() => this.setState({ isShow: false })}
                    title="Cancel"
                    textColor="white"
                  />
                </View>
                <View style={{ margin: 10 }}>
                  <Button color="#F7AE21" title="Procced" textColor="white" />
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Orders;
