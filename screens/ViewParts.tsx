import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewParts = ({ navigation }) => {
    const [parts, setParts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                let res = await fetch(`${API_URL}/api/parts/postedParts`, {
                    method: 'GET',
                    headers: {
                        authorization: token,
                    }
                })
                setParts(await res.json());
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])
    return (
        <View style={{ backgroundColor: "black", height: "100%" }}>
            <ScrollView>
                <SafeAreaView>
                    <View>
                        <View style={styles.extra}>
                            <TouchableOpacity style={styles.postbtn} onPress={() => { navigation.navigate("AddParts") }}><Text style={styles.postParttext}>Post New Part</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {parts.length > 0 ?
                            parts.map((item) => (
                                <View key={item.idCarParts} style={styles.card}>
                                    <Text style={styles.textPartHead}>Car Part - {item.partName}</Text>
                                    <Text style={styles.textInside}>Available at: {item.workshopName}</Text>
                                    <Text style={styles.textInside}>Qty: {item.quantity}</Text>
                                    <Text style={styles.textInside}>Contact Number: {item.contactNum}</Text>
                                    <Text style={styles.textInside}>Price: {item.price}</Text>
                                </View>
                            ))
                            :
                            <Text>No Data Found</Text>
                        }
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    postbtn: {
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
    postParttext: {
        fontSize: 20,
        textAlign: 'center',
        color: "white",
        fontWeight: "700"
    },
    extra: {
        alignItems: "center",
        justifyContent: "center"
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
    textPartHead: {
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
});
export default ViewParts;