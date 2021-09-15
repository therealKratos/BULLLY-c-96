import React, { Component } from 'react';
import { Text, View,StyleSheet, SafeAreaView, TouchableOpacity, Platform, StatusBar, ImageBackground, Image } from 'react-native';

export default class introScreen extends Component {
    render() {
        return (
            <View style={styles.container}> 
            <SafeAreaView style={styles.droidSafeArea} /> 
            <ImageBackground source={require('../assets/bg.jpg')} style={styles.backgroundImage}> 
            <View style={styles.titleBar}> 
            
            <Image source={require("../assets/logo.png")}style={{width:300,height:300,marginTop:300,marginRight:500}} ></Image>
            <Text style={styles.titleText}>UDDY</Text>
             </View>
             </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    droidSafeArea: { marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
    backgroundImage: { flex: 1, resizeMode: 'cover', }, 
    titleBar: { flex: 0.15, justifyContent: "center", alignItems: "center" },
    titleText: { fontSize: 40, fontWeight: "bold", color: "white" }

})