import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from "react-native-config";
// import FontAwesome from "@react-native-vector-icons/fontawesome"
// import { SvgUri } from "react-native-svg";
const HomeUser = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [notif, setNotif] = useState([]);

    const delNotif = async (num) => {
        try {
            const token = await AsyncStorage.getItem("token");
            await fetch(`${API_URL}/api/notifs/dismiss`, {
                method: 'POST',
                headers: {
                    authorization: token
                },
                body: JSON.stringify({ num }),
            })
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("token");
            if (!token) navigation.navigate('LoginUser')
            try {
                let response = await fetch(`${API_URL}/api/data/user/userData`, {
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
        fetchData();
    }, [])
    useEffect(() => {
        const fetchNotif = async () => {
            try {
                const token = await AsyncStorage.getItem("token")
                let res = await fetch(`${API_URL}/api/notifs/fetchNotifs`, {
                    headers: {
                        authorization: token
                    }
                });
                let d = await res.json();
                setNotif(d);
            } catch (e) { console.log(e); }
        }
        fetchNotif();
    }, [])

    return (
        <SafeAreaView style={styles.backbox}>
            <SafeAreaView style={styles.dashboardTop}>
                <Text style={styles.dash}>Dashboard</Text>
                {Array.isArray(data) ? (data.map((d) => (<Text key={d.username} style={styles.user}>{d.firstname}</Text>))) : <Text>ERR</Text>}
            </SafeAreaView>
            <SafeAreaView style={styles.detailstop}>
                {
                    Array.isArray(data) ?
                        data.map((d) => (
                            <View key={d.username}>
                                <Text style={styles.texttop}>Welcome - {d.firstname}</Text>
                                <TouchableOpacity
                                    style={styles.brokencarbutton}
                                    onPress={() => { navigation.navigate("MapsUser") }}
                                >
                                    <Text style={styles.buttontext}>Have a broken car? </Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        )) :
                        <Text>Text here</Text>
                }
            </SafeAreaView>
            <Text style={styles.services}>Other Services</Text>
            <SafeAreaView style={styles.buttonGroup}>
                <TouchableOpacity
                    style={styles.viewB}
                    onPress={() => { navigation.navigate('ViewWorkshop') }}
                >
                    <View style={styles.innerbox}>
                        <Image
                            source={require("../assets/Img/workshop-icon.png")}
                            style={styles.imgs}
                        />
                    </View>
                    <Text style={styles.btntexts}
                    >View Workshops</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.viewB}
                    onPress={() => { navigation.navigate('ViewParts') }}
                >
                    <View style={styles.innerbox}>
                        <Image
                            source={require("../assets/Img/speedometer-color-icon.png")}
                            style={styles.imgs}
                        />
                        {/* <FontAwesome name="car" size={30} color="#2f2f2f" /> */}
                    </View>
                    <Text style={styles.btntexts}>Buy Car Parts</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.notif}>
                {notif.length > 0 ? (
                    <View>
                        <Text style={styles.texttop}>
                            {notif[0].workshopName}
                        </Text>
                        <Text style={styles.texttopdetails}>
                            Help is on its way , {notif[0].workshopNum}
                        </Text>
                        <TouchableOpacity
                            style={styles.dismissbtn}
                            onPress={() => { delNotif(notif[0].phoneNum) }}
                        >
                            <Text style={styles.text}> Dismiss! </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.notifbox}>
                        <Text style={styles.texttop}>
                            No Response Yet
                        </Text>
                        <Text style={styles.texttopdetails}>
                            You have currently no notifs.
                        </Text>
                    </View>
                )}

            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    services: {
        color: "white",
        fontWeight: "600",
        fontSize: 26,
        marginTop: 30,
        textAlign: "center",
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    brokencarbutton: {
        backgroundColor: '#2f2f2f',
        width: 260,
        marginLeft: 20,
        marginTop: 40,
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
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
    buttontext: {
        color: "white",
        fontSize: 19,
        textAlign: "center",
        marginTop: 6,
        flexWrap: "wrap"
    },
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
        color: "white",
        fontSize: 20,
        marginRight: 40,
        textDecorationLine: "underline",
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
        backgroundColor: "black",
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
    notif: {
        backgroundColor: "black",
        borderColor: "black",
        height: "20%",
        width: "80%",
        marginLeft: 39,
        marginTop: 29,
        borderRadius: 20,
        shadowColor: "orange",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
    notifbox: {
        // alignItems: "center",
        justifyContent: "center"
    },
    dismissbtn: {
        backgroundColor: "#2f2f2f",
        height: "30%",
        width: "60%",
        marginLeft: 50,
        borderRadius: 25,
        marginTop: 10
    },
    text: {
        textAlign: "left",
        color: "white",
        fontSize: 20,
        marginLeft: 60,
        marginTop: 5
    }
})

export default HomeUser;