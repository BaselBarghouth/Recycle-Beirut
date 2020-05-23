import React, { Component } from "react";
import { PanResponder, Animated, Dimensions, Image, Text } from "react-native";
import up from "../assets/up.png";
import down from "../assets/down.png";
let { height } = Dimensions.get("screen");
class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      height: 0,
      img: down
    };
  }
  componentWillMount() {
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (this._val.y > this.state.height) {
          this.state.pan.setOffset({
            x: this._val.x,
            y: this._val.y
          });
          this.state.pan.setValue({ x: 0, y: 0 });
        }
        //else {
        //   this._val.y = this.state.height;
        //   this.state.pan.setOffset({
        //     x: this._val.x,
        //     y: this._val.y
        //   });
        //   this.state.pan.setValue({ x: 0, y: 0 });
        // }
      },
      onPanResponderMove: (e, gesture) => {
        if (
          this._val.y >= this.state.height &&
          this._val.y <= 0.2 * this.state.height
        ) {
          return Animated.event([null, { dx: 0, dy: this.state.pan.y }])(
            e,
            gesture
          );
        }
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dy > 0) {
          if (this._val.y <= 0.2 * this.state.height) {
            this.setState({ img: up });
            Animated.spring(this.state.pan, {
              toValue: {
                x: 0,
                y: -0.8 * this.state.height
              }
            }).start(() => {
              this.state.pan.setOffset({
                x: 0,
                y: -0.8 * this.state.height + this.state.height
              });
              this.state.pan.setValue({ x: 0, y: 0 });
            });
          }
        } else {
          if (this._val.y >= this.state.height) {
            this.setState({ img: down });

            Animated.spring(this.state.pan, {
              toValue: { x: 0, y: 0.8 * this.state.height }
            }).start(() => {
              this.state.pan.setOffset({
                x: 0,
                y: this.state.height
              });
              this.state.pan.setValue({ x: 0, y: 0 });
            });
          }
        }
      }
    });
  }

  render() {
    let transform = [
      {
        translateY: this.state.pan.y.interpolate({
          inputRange: [this.state.height, -0.2 * this.state.height],
          outputRange: [this.state.height, -0.2 * this.state.height],
          extrapolate: "clamp"
        })
      }
    ];
    return (
      <Animated.View
        style={{
          transform: transform,
          position: "absolute",
          zIndex: this.props.length - this.props.index + 1,
          width: "100%"
        }}
      >
        <Animated.View
          onLayout={e => {
            this._val.y =
              -e.nativeEvent.layout.height + 75 + 75 * this.props.index;
            this.state.pan.setOffset({
              x: this._val.x,
              y: this._val.y
            });
            this.state.pan.setValue({ x: 0, y: 0 });
            this.setState({
              height: -e.nativeEvent.layout.height + 75 + 75 * this.props.index
            });
          }}
        >
          {this.props.children}
          <Animated.View
            style={{
              height: 50,

              justifyContent: "center",
              alignItems: "center",
              backgroundColor: this.props.colors[this.props.index],
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30
            }}
            {...this.panResponder.panHandlers}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Futura",
                fontWeight: "bold",
                fontSize: 14
              }}
            >
              {this.props.titles[this.props.index]}
            </Text>
            <Image source={this.state.img} />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}
class Drag extends Component {
  constructor(props) {
    super(props);
    this.state = { heights: [], components: [] };
  }
  componentWillMount() {
    let components = this.props.components;
    this.setState({ components });
  }

  render() {
    return (
      <Animated.View>
        {this.state.components &&
          this.state.components.map((component, index) => {
            return (
              <Draggable
                {...this.props}
                length={this.state.components.length}
                key={index}
                index={index}
              >
                {component}
              </Draggable>
            );
          })}
      </Animated.View>
    );
  }
}
export default Drag;
