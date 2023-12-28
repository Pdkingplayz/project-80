import React, { Component } from 'react';
import { Text, View, SafeAreaView, ImageBackground, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from "axios"

export default class SpaceCraftScreen extends Component {
    constructor(){
        super()
        this.state = {
            aircrafts: {}
        }   
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios
            .get("https://ll.thespacedevs.com/2.0.0/config/spacecraft/")
            .then(response => {
                this.setState({ aircrafts: response.data.results})
                console.log(response.data.results)

            })
            .catch(error => {
                console.log(error.message)
            })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item}) => {
        return (
            <View style={{borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 10, elevation: 10, backgroundColor: 'white'}}>
                <Image source={{uri: item.agency.image_url}} style={{ width: "100%", height: 200, marginTop: 15, marginBottom: 15, marginRight: 10}}></Image>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: "#797979"}}>{item.name}</Text>
                <Text style={{color:'#696969', fontWeight: 'bold', fontSize: 20}}>{item.agency.name}</Text>
                <Text style={{color:'#696969'}}>DESCRIPTION</Text>
                <Text style={{color: "#A9A9A9", marginRight: 10, marginLeft: 10}}>{item.agency.description}</Text>
            </View>
        )
    }


    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require("../assets/space.gif")}>
                    <View style={{marginTop: 5, marginLeft: 85, paddingBottom: 5}}>
                        <Text style={styles.titleText}>SpaceCrafts</Text>
                    </View>
                    
                    <View>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.aircrafts}
                            renderItem={this.renderItem}
                            />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
});