import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker, Overlay } from 'react-native-maps';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RenderMapWorkshop({ navigation }) {
    const [region, setRegion] = useState(null);
    const handleClick = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/location/brokenCars/helpsent`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token
                    },
                }
            );
            let json = await response.json();
            navigation.goBack();
            if (json.message === "Help Sent") {
                Alert.alert("Success", `Contact the user on his/her phone Number: ${json.loggedPhone}`, [{ text: "OK", onPress: () => { navigation.goBack() } }])
                console.log("help sent");
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await fetch(`${API_URL}/api/location/brokenCars/workshopmaprender`, {
                    headers: {
                        authorization: token,
                    },
                });
                const json = await response.json();
                setRegion({ latitude: json.latitude, longitude: json.longitude, latitudeDelta: json.latitudeDelta, longitudeDelta: json.longitudeDelta });
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: "#fffff1" }}>
            {region ? (
                <View style={{ flex: 1 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ height: "70%", width: "100%", borderRadius: 25 }}
                        initialRegion={region}
                    >
                        <Marker
                            coordinate={{
                                latitude: region.latitude,
                                longitude: region.longitude,
                            }}
                            title="Your Location"
                        />
                    </MapView>
                    <SafeAreaView style={styles.lowerBox}>

                        <TouchableOpacity style={styles.Button} onPress={() => { handleClick() }}>
                            {/* <Image source={require("../assets/Img/backbutton.png")} />
               */}
                            <View>
                                <Text style={styles.textbtn}>Send Help!</Text>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            )
                :
                <Text>Loading</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    lowerBox: {
        backgroundColor: "#fffff1",
        width: "100%",
        height: "30%",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 25,
    },
    Button: {
        // position: 'absolute',
        // top: 90,
        // left: 50,
        zIndex: 1,
        width: 200,
        height: 70,
        backgroundColor: "#2f2f2f",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24,
        padding: 20
    },
    textbtn: {
        fontSize: 19,
        color: "white"
    }
})