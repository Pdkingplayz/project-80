import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'

export default class StarMapScreen extends Component {
    constructor(){
        super()

        this.state={
            latitude: null,
            longitude: null
        }
    }

    render() {
        const { latitude, longitude } = this.state;
        const path = 'https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true'

        return (
            <View style={styles.container}>

                <View style={styles.titleBar}>
                    <Text style={styles.titleText}>Star Map</Text>
                </View>

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingLeft: 20}}
                    placeholder= "Enter your latitude"
                    placeholderTextColor="#ffff#000000"
                    onChangeText={(text)=>{this.setState({latitude: text})}}
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingLeft: 20,}}
                    placeholder= "Enter your longitude"
                    placeholderTextColor="#ffff#000000"
                    onChangeText={(text)=>{this.setState({longitude: text})}}
                />

                <WebView 
                    scalesPagesToFit={true}
                    source={{uri: path}}
                    style={{ marginTop: 20, marginBottom: 20}}
                    />
                    
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple'
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    routeCard: {
        flex: 0.12,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 100,
        backgroundColor: "white"
    },
    titleBar: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 60,
        fontWeight: "bold",
        color: "white"
    },
    routeText: {
        fontSize: 25,
        fontWeight: "bold",
        color: '#D11583',
        justifyContent: "center",
        alignItems: "center"
    },
    routeImage: {
        position: "absolute",
        top: -20,
        right: -15,
        height: 80,
        width: 80,
        resizeMode: "contain"
    }
});