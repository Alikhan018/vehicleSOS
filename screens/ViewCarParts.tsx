import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
const CarParts = ({ navigation }) => {

    const [CarParts, setCarParts] = useState([])
    useEffect(() => {
        const fecthData = async () => {
            try {
                let token = await AsyncStorage.getItem("token");
                let res = await fetch(`${API_URL}/api/parts/getParts`, {
                    headers: {
                        authorization: token,
                    }
                })
                let data = await res.json();
                setCarParts(data);
            } catch (err) {
                console.log(err)
            }
        }
        fecthData();
    }, [])
    const startFetch = async (id, phone, name) => {
        try {
            const token = await AsyncStorage.getItem("token");
            let res = await fetch(`${API_URL}/api/parts/startpartsfetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify({ id, phone, name }),
            })
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <ScrollView style={styles.back}>
            <SafeAreaView style={styles.viewMain}>
                <Text style={styles.textCarPartsList}> Car Parts List </Text>
                {/* <ScrollView contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false} > */}
                {CarParts.map((item) => (
                    <View key={item.idCarParts} style={styles.card}>
                        <Text style={styles.textCarHead}>Car Part - {item.partName}</Text>
                        <Text style={styles.textInside}>Available at: {item.workshopName}</Text>
                        <Text style={styles.textInside}>Owned by: {item.ownerName}</Text>
                        <Text style={styles.textInside}>Contact Number: {item.contactNum}</Text>
                        <Text style={styles.textInside}>Price: {item.price}</Text>
                        <View style={styles.extra}>
                            <TouchableOpacity style={styles.sendHelpBtn} onPress={() => { startFetch(item.idcarParts, item.contactNum, item.ownerName); navigation.navigate("Checkout"); }}><Text style={styles.sendhelptxt}>Place Order!</Text></TouchableOpacity>
                        </View>
                    </View>
                ))}
                {/* </ScrollView> */}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: "black",
        // height: "100%"
    },
    viewMain: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textCarPartsList: {
        fontSize: 30,
        fontWeight: "600",
        textDecorationLine: "underline",
        color: "white",
        textDecorationColor: "white"
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


export default CarParts;
