import { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeWorkshop = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("token")
            if (!token) navigation.navigate('LoginWorkshop')
            console.log(token);
            try {
                let response = await fetch(`${API_URL}/api/data/user/w/workshopData`, {
                    headers: {
                        authorization: token
                    }
                })
                let jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])

    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            <SafeAreaView style={styles.backbox}>
                <SafeAreaView style={styles.dashboardTop}>
                    <Text style={styles.dash}>Dashboard</Text>
                    {Array.isArray(data) ? (data.map((d, index) => (<Text style={styles.user}>{d.workshopName}</Text>))) : <Text>Not found</Text>}
                </SafeAreaView>
                <SafeAreaView style={styles.detailstop}>
                    {Array.isArray(data) ? (
                        data.map((d, index) => (
                            <View key={index}>
                                <Text style={styles.texttop}>Welcome - {d.workshopName}</Text>
                                <Text style={styles.texttopdetails}>Owned by - {d.ownerName} {'\n'}Workshop Id: {d.idworkshop}{'\n'}Number of Employees: {d.numofEmp}{'\n'}Location: {d.location}</Text>
                            </View>
                        ))
                    ) :
                        <Text>Ok</Text>
                    }
                </SafeAreaView>
                <Text style={styles.services}>Services</Text>
                <SafeAreaView style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.viewB}
                        onPress={() => { navigation.navigate("BrokenCars") }}
                    >
                        <View style={styles.innerbox}>
                            <Image
                                source={require("../assets/Img/repair.jpg")}
                                style={styles.imgs}
                            />
                        </View>
                        <Text style={styles.btntexts}
                        >View Broken Cars</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewB}
                        onPress={() => { navigation.navigate("ViewPartsWorkshop") }}
                    >
                        <View style={styles.innerbox}>
                            <Image
                                source={require("../assets/Img/speedometer-color-icon.png")}
                                style={styles.imgs}
                            />
                            {/* <FontAwesome name="car" size={30} color="#2f2f2f" /> */}
                        </View>
                        <Text style={styles.btntexts}>Sell Car Parts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewB}
                        onPress={() => { navigation.navigate("ViewOrders") }}
                    >
                        <View style={styles.innerbox}>
                            <Image
                                source={require("../assets/Img/cart-arrow-down-icon.png")}
                                style={styles.imgs}
                            />
                            {/* <FontAwesome name="car" size={30} color="#2f2f2f" /> */}
                        </View>
                        <Text style={styles.btntexts}>View Orders</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dashboardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dash: {
        fontSize: 24,
        marginLeft: 30,
        fontWeight: "700",
        color: "white"
    },
    user: {
        fontSize: 20,
        marginRight: 40,
        textDecorationLine: "underline",
        color: "white"
    },
    texttop: {
        marginTop: 20,
        marginLeft: 30,
        color: "#FFFFFF",
        textAlign: "left",
        fontWeight: "500",
        fontSize: 24
    },
    backbox: {
        flex: 1,
        backgroundColor: "#000000",
        // justifyContent: "space-evenly",
        // alignItems: "center"
    },
    texttopdetails: {
        marginTop: 20,
        color: "#FFFFFF",
        textAlign: "left",
        marginLeft: 35,
        fontWeight: "500",
        fontSize: 18
    },
    detailstop: {
        backgroundColor: "black",
        width: 300,
        marginLeft: 50,
        height: 200,
        marginTop: 30,
        borderRadius: 25,
        // overflow: "scroll",
        shadowColor: "orange",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
    services: {
        color: "white",
        fontWeight: "600",
        fontSize: 26,
        marginTop: 40,
        textAlign: "center"
    },
    imgs: {
        width: 48,
        height: 48
    },
    innerbox: {
        padding: 20,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: 105,
        height: 80,
        backgroundColor: "#ffffff",
        // marginBottom: 6,
        borderRadius: 15,
        shadowColor: "orange",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24,
        marginBottom: 6
    },
    btntexts: {
        fontSize: 16,
        textAlign: 'center',
        color: "white",
        fontWeight: "700"
    },
    viewB: {
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: "black",
        width: 150,
        height: 150,
        marginBottom: "10%",
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
    buttonGroup: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 50,
    },
});

export default HomeWorkshop;