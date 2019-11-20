import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button
} from "react-native";
import React, { Component } from "react";
export default class App extends Component {
  constructor() {
    super();

    this.state = { expanded: false };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnTextHolder}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.changeLayout}
            style={styles.Btn}
          >
            <Text style={styles.btnText}>Expand / Collapse</Text>
          </TouchableOpacity>
          <View
            style={{
              overflow: "hidden",
              height: this.state.expanded ? null : 0
            }}
          >
            <View style={styles.text}>
              <TouchableWithoutFeedback>
                <View style={styles.container}>
                  <View style={styles.containerInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      textContentType="name"
                      placeholderTextColor="grey"
                    />
                  </View>
                  <View style={styles.containerInput}>
                    <TextInput
                      style={styles.input}
                      textContentType="emailAddress"
                      placeholder="Email"
                      placeholderTextColor="grey"
                    />
                  </View>
                  <View style={styles.containerInput}>
                    <TextInput
                      style={styles.input}
                      textContentType="password"
                      placeholder="Password"
                      placeholderTextColor="grey"
                    />
                  </View>
                  <View style={styles.containerInput}>
                    <TextInput
                      style={styles.input}
                      textContentType="password"
                      placeholder="Confirm Password"
                      placeholderTextColor="grey"
                    />
                  </View>
                  <View style={styles.containerInput}>
                    <TextInput
                      style={styles.input}
                      textContentType="telephoneNumber"
                      placeholder="Phone Number"
                      placeholderTextColor="grey"
                    />
                  </View>
                  <View style={styles.containerButtons}>
                    <View style={styles.containerButton}>
                      <Button color="#F7AE21" title="Add your location" />
                    </View>
                    <View style={styles.containerButton}>
                      <Button
                        color="#F7AE21"
                        title="Create Account"
                        // onPress={createAccount}
                      />
                    </View>
                    <View style={styles.containerButton}>
                      <Button color="#F7AE21" title="Already registerd" />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },

  text: {
    fontSize: 17,
    color: "black",
    padding: 10
  },

  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 20
  },

  btnTextHolder: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)"
  },

  Btn: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },
  containerInput: {
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    textAlign: "center",
    borderRadius: 50,
    backgroundColor: "#F7AE21",
    height: 50,

    marginTop: 10
  },
  containerButtons: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    marginTop: 10
  }
});
