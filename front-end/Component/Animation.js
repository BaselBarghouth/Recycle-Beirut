import React, { Component } from "react";
import { Animated, Image } from "react-native";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.moveAnimation = new Animated.ValueXY();
  }
  move = () => {
    this.moveAnimation.setValue(this.props.start);
    Animated.timing(this.moveAnimation, {
      toValue: this.props.end,
      duration: 15000
    }).start(() => this.move());
  };
  componentDidMount = () => {
    this.move();
  };

  render() {
    return (
      <Animated.View style={[this.moveAnimation.getLayout()]}>
        <Image
          source={this.props.image}
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            height: this.props.height,
            width: this.props.width
          }}
        />
      </Animated.View>
    );
  }
}
