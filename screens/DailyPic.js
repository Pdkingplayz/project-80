import React, { Component } from 'react';
import { Text, View , StyleSheet, ImageBackground, Image, TouchableOpacity, Linking, SafeAreaView} from 'react-native';
import axios from 'axios'


export default class DailyPicScreen extends Component {

    constructor(){
        super()
        this.state = {
            apod: {}
        }
    }

    componentDidMount(){
        this.getAPOD()
    }

    getAPOD = () => {
        axios
            .get("https://api.nasa.gov/planetary/apod?api_key=OGy6HJyMwYXwdr715B0pqosL118o92Tcb5LuTltR")
            .then(response => {
                this.setState({ apod: response.data})
            })
            .catch(error => {
                Alert.alert(error.message)
            })
            }

    render() {
        console.log(this.state.apod.url)
        const url = this.state.apod.url

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <ImageBackground source={require("../assets/stars.gif")} style={styles.backgroundImage}>
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>Daily Pics</Text>
                    </View>
                    <TouchableOpacity style={{marginBottom: 20}}
                    onPress={()=>Linking.openURL(this.state.apod.url).catch(err => console.error("Couldn't load page", err))} >     
                        <View>
                            <Image source={require("../assets/play-video.png")} style={styles.routeImage}></Image>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.routeText}>
                        {this.state.apod.title}
                    </Text>
                    <View>
                        <Text style={{marginRight: 20, marginLeft: 20, color:"#FFFFFF", fontSize: 15}}>{this.state.apod.explanation}</Text>
                    </View>
                    
                </ImageBackground>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        alignItems: "center",
        marginBottom: 25
        
    },
    titleText: {
        fontSize: 60,
        fontWeight: "bold",
        color: "white",
        paddingTop: 30
    },
    routeText: {
        fontSize: 25,
        fontWeight: "bold",
        color: '#D11583',
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        width: "100%",
        marginTop: 100,
        marginBottom: 50
    },
    routeImage: {
        position: "absolute",
        top: -5,
        right: 170,
        height: 80,
        width: 80,
        resizeMode: "contain"
    }
});