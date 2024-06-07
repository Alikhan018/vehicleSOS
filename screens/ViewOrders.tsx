import { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ViewOrders = ({ navigation }) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("token")
            if (!token) navigation.navigate('LoginWorkshop')
            try {
                let response = await fetch(`${API_URL}/api/parts/getOrders`, {
                    headers: {
                        authorization: token
                    }
                })
                let jsonData = await response.json();
                setOrders(jsonData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])
    return (
        <View style={styles.back}>
            <ScrollView contentContainerStyle={{ backgroundColor: "black" }}>
                <SafeAreaView style={styles.viewMain}>
                    {/* <ScrollView contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false} > */}
                    <Text style={styles.services}>Orders</Text>
                    {orders.map((item) => (
                        <View key={item.idorderNotifs} style={styles.card}>
                            <Text style={styles.texttop}>Order id - {item.idorderNotifs}</Text>
                            <Text style={styles.texttopdetails}>Address: {item.addressOne}, {item.addressTwo}</Text>
                            <Text style={styles.texttopdetails}>Order by: {item.name}</Text>
                            <Text style={styles.texttopdetails}>Contact Number: {item.phoneNum}</Text>
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
    orderbox: {
        // alignItems: "center",
        justifyContent: "center",
    },
    card: {
        marginTop: 40,
        backgroundColor: "black",
        width: "90%",
        height: "30%",
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
    texttop: {
        marginTop: 20,
        marginLeft: 30,
        color: "#FFFFFF",
        textAlign: "left",
        fontWeight: "500",
        fontSize: 24
    },
    services: {
        color: "white",
        fontWeight: "600",
        fontSize: 26,
        marginTop: 40,
        textAlign: "center"
    },
    texttopdetails: {
        marginTop: 20,
        color: "#FFFFFF",
        textAlign: "left",
        marginLeft: 35,
        fontWeight: "500",
        fontSize: 18
    }
});

export default ViewOrders;
