import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
const BrokenCars = ({ navigation }) => {

    const [brokenCars, setBrokenCars] = useState([])
    useEffect(() => {
        const fecthData = async () => {

            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) {
                    navigation.navigate("LoginWorkshop")
                }
                let res = await fetch(`${API_URL}/api/brokencars/getBrokenCars`, {
                    headers: {
                        authorization: token,
                    }
                })
                let data = await res.json();
                setBrokenCars(data);
            } catch (err) {
                console.log(err)
            }
        }
        fecthData();
    }, [])
    const startFetch = async (num, id) => {
        try {
            const token = await AsyncStorage.getItem("token")
            let res = await fetch(`${API_URL}/api/location/brokenCars/startfetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify({ num, id }),
            })
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <View style={styles.back}>
            <ScrollView contentContainerStyle={{ backgroundColor: "black" }}>
                <SafeAreaView style={styles.viewMain}>
                    {/* <ScrollView contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false} > */}
                    <Text style={styles.textBrokenCarsList}>Broken Cars List</Text>
                    {brokenCars.map((item) => (
                        <View key={item.idbrokenCars} style={styles.card}>
                            <Text style={styles.textCarHead}>Broken Car - {item.carName}</Text>
                            <Text style={styles.textInside}>Located at:</Text>
                            <Text style={styles.textInside}>Longitude: {item.longitude.toFixed(14)}</Text>
                            <Text style={styles.textInside}>Latitude: {item.latitude.toFixed(15)}</Text>
                            <Text style={styles.textInside}>Owned by: {item.ownerName}</Text>
                            <Text style={styles.textInside}>Contact Number: {item.phoneNum}</Text>
                            <View style={styles.extra}>

                                <TouchableOpacity style={styles.sendHelpBtn} onPress={() => {
                                    startFetch(item.phoneNum, item.idbrokenCars);
                                    navigation.navigate("BrokenCarsMap");
                                }}><Text style={styles.sendhelptxt}>Send Help!</Text></TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    {/* </ScrollView> */}
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: "black",
        height: "100%"
    },
    viewMain: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    textBrokenCarsList: {
        fontSize: 30,
        fontWeight: "600",
        textDecorationLine: "underline",
        color: "white"
    },
    card: {
        marginTop: 40,
        backgroundColor: "black",
        width: "90%",
        // height: "30%",
        justifyContent: 'space-around',
        // alignItems: "center",
        borderRadius: 25,
        padding: 40,
        shadowColor: "orange",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24,
        marginBottom: 20,
    },
    textCarHead: {
        color: "white",
        fontSize: 24,
        fontWeight: "500",
        textAlign: 'left',
        marginBottom: 15
    },
    textInside: {
        fontSize: 20,
        color: "white",
        marginTop: 30,
        fontWeight: "500"
    },
    sendHelpBtn: {
        backgroundColor: '#2f2f2f',
        width: 260,
        // marginLeft: 0,
        marginTop: 70,
        height: 60,
        borderRadius: 25,
        // overflow: "hidden",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
    sendhelptxt: {
        fontSize: 20,
        textAlign: 'center',
        color: "white",
        fontWeight: "700"
    },
    extra: {
        alignItems: "center",
        justifyContent: "center"
    }
})


export default BrokenCars;
