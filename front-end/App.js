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
import Signup1 from "./Pages/Signup1";

import Right from "./Pages/Right";
import Swipe from "./Component/SingleUser";
import Orders from "./Pages/Orders";
import Users from "./Pages/Users";
import History from "./Pages/History";
import SingleOrderAdmin from "./Component/SingleOrderAdmin.js";
import TT from "./Component/SingleUser";
export default App = () => {
  const [login, setLogin] = useState(true);
  return (
    // <Right />
    <Router>
      <Scene key="root">
        <Scene
          key="Signin"
          hideNavBar={true}
          initial={login}
          component={Signin}
        />
        <Scene
          key="Signup"
          hideNavBar={true}
          initial={false}
          component={Signup}
        />
        <Scene key="Home" hideNavBar={true} initial={false} component={Home} />
        <Scene
          key="Orders"
          hideNavBar={true}
          initial={false}
          component={Orders}
        />
        <Scene
          key="Users"
          hideNavBar={true}
          initial={false}
          component={Users}
        />
        <Scene key="GG" hideNavBar={true} initial={false} component={Signup1} />
        <Scene key="TT" hideNavBar={true} initial={false} component={TT} />
        <Scene
          key="History"
          hideNavBar={true}
          initial={false}
          component={History}
        />
      </Scene>
    </Router>
  );
};
