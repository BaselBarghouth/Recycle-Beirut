import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, PixelRatio } from "react-native";
import Drag from "./Component/Drag";
import Map from "./Component/Map";
let { height, width } = Dimensions.get("window");
const RATIO = PixelRatio.getPixelSizeForLayoutSize(height) / height;
import Signin from "./Pages/Signin";
import Clicked from "./Pages/Clicked";
import Home from "./Pages/Home";
import { Router, Scene } from "react-native-router-flux";
import Signup from "./Pages/Signup";
import Left from "./Pages/Left";
export default App = () => {
  const [login, setLogin] = useState(true);
  return <Map />;

  // <Router>
  //   <Scene key="root">
  //     <Scene
  //       key="Signin"
  //       hideNavBar={true}
  //       initial={login}
  //       component={Signin}
  //     />
  //     <Scene
  //       key="Signup"
  //       hideNavBar={true}
  //       initial={false}
  //       component={Signup}
  //     />
  //     <Scene key="Home" hideNavBar={true} initial={false} component={Home} />
  //   </Scene>
  // </Router>;
};
