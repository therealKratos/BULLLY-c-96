import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class budgetPlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      text: '', displayText: '',

    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
        </Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
        <TextInput style={styles.inputBox} onChangeText={text => { this.setState({ text: text }); }} value={this.state.text} /> 
        <TouchableOpacity style={styles.goButton} onPress={() => { this.setState({ displayText: this.state.text }); }}> 
        <Text style={styles.buttonText}>GO
        </Text> 
        </TouchableOpacity> 
        <Text style={styles.displayText}>
          {this.state.displayText}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 15
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF"
  },
  inputBox: { marginTop: 50, width: '20%', alignSelf: 'center', height: 40, textAlign: 'center', borderWidth: 4, outline: 'none', },
  goButton: { width: '50%', height: 55, alignSelf: 'center', padding: 10, margin: 10, },
  buttonText: { textAlign: 'center', fontSize: 30, fontWeight: 'bold', },
  displayText: { textAlign: 'center', fontSize: 30, },

});