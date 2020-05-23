import React, { Component } from "react";
import {
  ScrollView,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet
} from "react-native";
import SingleOrderAdmin from "../Component/SingleOrderAdmin";
import Swipeout from "react-native-swipeout";
import truckIcon from "../assets/truck.png";
import Button from "../Component/Button";
import SingleOrderAdmin2 from "../Component/SingleOrderAdmin2";

const { width, height } = Dimensions.get("window");
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isShow: false
    };
  }
  componentDidMount() {
    let orders = fetch(`http://192.168.0.106:5001/orders`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("=====>", data);
        let orders = data.data.filter(i => i.order_status == "pendding");
        this.setState(
          {
            orders
          },
          () => console.log(this.state)
        );
      })
      .catch(err => console.log("errjj", err));
  }
  render() {
    const swipeoutBtns = [
      {
        text: "Ak",
        backgroundColor: "#F7AE21",
        onPress: () => {
          let { orders, index } = this.state,
            truck = [...this.state.truck, orders[index]];

          orders.splice(index, 1);
          this.setState({ orders, index: "", truck });
        }
      }
    ];
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.text}>TRUCKS</Text>
        </View>
        <View style={styles.button}>
          <Button
            color="#F7AE21"
            title="SEE TRUCK"
            textColor="white"
            style={{ width: 0.7 * width }}
            clicked={() => this.setState({ isShow: true })}
          />
        </View>
        <ScrollView>
          <SingleOrderAdmin name="Saeb" date="1/1/2020" phone="78652351" />
          <SingleOrderAdmin name="Mazen" date="3/1/2020" phone="89647321" />
          <SingleOrderAdmin name="Tahseen" date="4/1/2020" phone="76703031" />
          <SingleOrderAdmin name="Khaled" date="5/1/2020" phone="8185836" />
          <SingleOrderAdmin name="Ali" date="10/1/2020" phone="77766620" />
          <SingleOrderAdmin name="Hasan" date="17/1/2020" phone="76543218" />
        </ScrollView>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isShow}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isShow: false });
              }}
            >
              <ScrollView>
                <SingleOrderAdmin2
                  name="Saeb"
                  date="1/1/2020"
                  phone="78652351"
                />
                <SingleOrderAdmin2
                  name="Mazen"
                  date="3/1/2020"
                  phone="89647321"
                />
              </ScrollView>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Orders;
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
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#008D78",
    height,
    width,
    justifyContent: "center",
    alignItems: "center"
  }
});
// class Orders extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { orders: [], index: "", truck: [], isShow: false };
//   }
//   componentWillMount() {
//     console.log(this.props);
//     let orders = fetch(`http://192.168.1.107:5001/orders`, {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         let orders = data.data.filter(i => i.order_status == "pendding");
//         this.setState({
//           orders
//         });
//       })
//       .catch(err => console.log("err", err));
//   }
//   submitTruck = () => {
//     let today = new Date();
//     let body = {
//       status: "pendding",
//       date: today
//     };
//     let truck = this.state.truck,
//       order_id = truck.map(item => {
//         let id = item.order_id;
//         return id;
//       });
//     console.log(truck, order_id);
//     let addPickUp = fetch(`http://192.168.1.107:5001/pickup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(body)
//     })
//       .then(response => response.json())
//       .then(data => {
//         let lastId = data.data.stmt.lastID;
//         data.success
//           ? order_id.forEach(element => {
//               let body = {
//                   order_id: element,
//                   pickup_id: lastId
//                 },
//                 addPickup_order = fetch(
//                   `http://192.168.1.107:5001/pickup_order`,
//                   {
//                     method: "POST",
//                     headers: {
//                       "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(body)
//                   }
//                 )
//                   .then(response => response.json())
//                   .then(data => {
//                     console.log("done");
//                   });
//               let order = {
//                 order_status: "Proccesing"
//               };
//               let edit_order = fetch(
//                 `http://192.168.1.107:5001/orders/${element}`,
//                 {
//                   method: "PUT",
//                   headers: {
//                     "Content-Type": "application/json"
//                   },
//                   body: JSON.stringify(order)
//                 }
//               )
//                 .then(response => response.json())
//                 .then(data => {
//                   this.setState({
//                     isShow: false
//                   });
//                 });
//             })
//           : null;
//       })
//       .catch(err => console.log("err", err));
//   };
//   render() {
//     const swipeoutBtns = [
//       {
//         text: "Add to Truck",
//         backgroundColor: "#F7AE21",
//         onPress: () => {
//           let { orders, index } = this.state,
//             truck = [...this.state.truck, orders[index]];

//           orders.splice(index, 1);
//           this.setState({ orders, index: "", truck });
//         }
//       }
//     ];
//     const swipeoutBtns1 = [
//       {
//         text: "Remove from Truck",
//         backgroundColor: "#F7AE21",
//         onPress: () => {
//           let { truck, index } = this.state,
//             orders = [...this.state.orders, truck[index]];

//           truck.splice(index, 1);
//           this.setState({ truck, index: "", orders });
//         }
//       }
//     ];

//     return (
//       <View>
//         <View style={{ backgroundColor: "#008D78" }}>
//           <View
//             style={{
//               height: 0.15 * height,
//               backgroundColor: "#F7AE21",
//               borderBottomLeftRadius: 30,
//               borderBottomRightRadius: 30,
//               justifyContent: "center",
//               textAlign: "center"
//             }}
//           >
//             <Text
//               style={{
//                 color: "white",
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 fontSize: 18
//               }}
//             >
//               Orders
//             </Text>
//           </View>
//         </View>
//         <ScrollView style={{ backgroundColor: "#008D78" }}>
//           {this.state.orders &&
//             this.state.orders.map((order, index) => {
//               return (
//                 <Swipeout
//                   autoClose={true}
//                   style={{ marginTop: 25 }}
//                   right={swipeoutBtns}
//                   buttonWidth={100}
//                   key={index}
//                   onOpen={() => this.setState({ index: index })}
//                 >
//                   <SingleOrder key={index} order={order} />
//                 </Swipeout>
//               );
//             })}
//         </ScrollView>
//         <TouchableOpacity
//           onPress={() =>
//             this.setState({
//               isShow: true
//             })
//           }
//           style={{
//             position: "absolute",
//             top: 0.5 * height - 50,
//             zIndex: 22,
//             right: 0
//           }}
//         >
//           <Image
//             resizeMode="contain"
//             resizeMethod="resize"
//             source={truckIcon}
//             style={{ height: 100, width: 100 }}
//           />
//         </TouchableOpacity>
//         <Modal
//           transparent={true}
//           animationType="slide"
//           visible={this.state.isShow}
//         >
//           <View
//             style={{
//               backgroundColor: "black",
//               justifyContent: "center",
//               alignItems: "center"
//             }}
//           >
//             <ScrollView>
//               {this.state.truck &&
//                 this.state.truck.map((order, index) => {
//                   return (
//                     <Swipeout
//                       autoClose={true}
//                       style={{ marginTop: 25 }}
//                       right={swipeoutBtns1}
//                       buttonWidth={100}
//                       key={index}
//                       onOpen={() => this.setState({ index: index })}
//                     >
//                       <SingleOrder key={index} order={order} />
//                     </Swipeout>
//                   );
//                 })}
//               <View
//                 style={{
//                   flexDirection: "row"
//                 }}
//               >
//                 <View style={{ margin: 10 }}>
//                   <Button
//                     color="#F7AE21"
//                     clicked={() => this.setState({ isShow: false })}
//                     title="Cancel"
//                     textColor="white"
//                   />
//                 </View>
//                 <View style={{ margin: 10 }}>
//                   <Button
//                     color="#F7AE21"
//                     clicked={this.submitTruck}
//                     title="Procced"
//                     textColor="white"
//                   />
//                 </View>
//               </View>
//             </ScrollView>
//           </View>
//         </Modal>
//       </View>
//     );
//   }
// }

// export default Orders;
