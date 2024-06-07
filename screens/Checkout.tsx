import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ navigation }) => {
    const [AddressOne, setAddressOne] = useState("");
    const [AddressTwo, setAddressTwo] = useState("");

    const placeOrder = async (ad1, ad2) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/parts/placeOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
                body: JSON.stringify({ ad1, ad2 })
            });
            const data = await res.json();
            console.log(data);
            if (data.message === 'Order Sent ON') {
                Alert.alert('Success', `Your Order is placed`, [{ text: " OK", onPress: () => { navigation.goBack(); } }]);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.backbox}>
            <SafeAreaView style={styles.page}>
                <View>
                    <Text style={styles.checkout}>Checkout</Text>
                </View>
                <View style={styles.inputBox}>
                    <View>
                        <Text style={[styles.texts, { color: "#cccccc" }]}>Address -1</Text>
                        <TextInput
                            style={[styles.textBox, { color: "#cccccc" }]}
                            autoFocus
                            placeholder="Enter House No, Street Name"
                            placeholderTextColor={"#cccccc"}
                            value={AddressOne}
                            onChangeText={(text) => {
                                setAddressOne(text);
                            }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.texts, { color: "#cccccc" }]}>Address -2</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder="Enter City, Province"
                            placeholderTextColor={"#cccccc"}
                            value={AddressTwo}
                            onChangeText={(text) => {
                                setAddressTwo(text);
                                console.log(AddressTwo);
                            }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { placeOrder(AddressOne, AddressTwo) }}
                        >
                            <Text style={[styles.texts, { color: "#cccccc" }]}>Place Order!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}



const styles = StyleSheet.create({
    checkout: {
        color: "white",
        fontSize: 44,
        fontWeight: "800",
        // textShadowColor: "red", textShadowOffset: { width: 0, height: 30 }, textShadowRadius: 25
    },
    backbox: {
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        alignContent: "center",
    },
    page: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    // backbox: {
    //     height: "100%",
    //     width: "100%",
    //     backgroundColor: "black",
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     alignContent: "center",
    // },
    inputBox: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "space-between",
        backgroundColor: "#000000",
        width: "80%",
        height: "50%",
        borderRadius: 25,
        shadowColor: "orange",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24,
        padding: 20
    },
    texts: {
        color: "black",
        fontSize: 22,
    },
    textBox: {
        height: 40,
        width: 300,
        marginBottom: 40,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: "#000000",
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "orange",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24,
    },
})

export default Checkout;