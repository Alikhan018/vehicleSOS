import { Text, View, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import SignUp from "./Signup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpWorkshop = () => {
    const [ownerName, setOwner] = useState("");
    const [workshopName, setWorkshop] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNum, setPhoneNum] = useState("");


    const handleSignUp = async () => {
        try {
            const result = await fetch(`${API_URL}/api/auth/signupWuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ownerName, workshopName, location, email, password, phoneNum })
            });
            const data = await result.json();
            const token = data.token;
            await AsyncStorage.setItem("token", token)
        }
        catch (err) {
            console.log(err);
        }

    }


    return (
        <KeyboardAwareScrollView style={styles.back}>
            <View style={styles.backbox}>
                <View style={styles.containerTop}>
                    <Text style={styles.topHeader}>Signup</Text>
                    <Text style={styles.topText}>Submit the form below to register your Workshop.</Text>
                </View>
                <SafeAreaView style={styles.form}>
                    <View>
                        <Text style={styles.texts}>Enter Owner Name</Text>
                        <TextInput style={[styles.inputbox, { color: "#cccccc" }]} placeholder="Owner Name" placeholderTextColor={"#cccccc"}
                            value={ownerName} onChangeText={(text) => { setOwner(text) }}
                        ></TextInput>
                    </View>
                    <View>
                        <Text style={styles.texts}>Enter Workshop Name</Text>
                        <TextInput style={[styles.inputbox, { color: "#cccccc" }]} placeholder="Workshop Name" placeholderTextColor={"#cccccc"}
                            value={workshopName} onChangeText={(text) => { setWorkshop(text) }}
                        ></TextInput>
                    </View>
                    <View>
                        <Text style={styles.texts}>Enter Workshop Location</Text>
                        <TextInput style={[styles.inputbox, { color: "#cccccc" }]} placeholder="Workshop Location" placeholderTextColor={"#cccccc"}
                            value={location} onChangeText={(text) => { setLocation(text) }}
                        >

                        </TextInput>
                    </View>
                    <View>
                        <Text style={styles.texts}>Enter Email</Text>
                        <TextInput style={[styles.inputbox, { color: "#cccccc" }]} placeholder="Email" placeholderTextColor={"#cccccc"}
                            value={email} onChangeText={(text) => { setEmail(text) }}
                        ></TextInput>
                    </View>
                    <View>
                        <Text style={styles.texts}>Enter Password</Text>
                        <TextInput style={[styles.inputbox, { color: "#cccccc" }]} placeholder="Password" placeholderTextColor={"#cccccc"}
                            value={password} onChangeText={(text) => { setPassword(text) }}
                        ></TextInput>
                    </View>
                    <View>
                        <Text style={styles.texts}>Enter Phone Number</Text>
                        <TextInput style={[styles.inputbox, { color: "#cccccc" }]} placeholder="Phone Number" placeholderTextColor={"#cccccc"}
                            value={phoneNum} onChangeText={(text) => { setPhoneNum(text) }}
                        ></TextInput>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSignUp}
                        >
                            <Text style={styles.texts}>Sign Up!</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: "black",
    },
    backbox: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "space-around",
        marginLeft: "5%",
        marginTop: "8%",
        marginBottom: "8%",
        height: "110%",
        width: "90%",
        borderRadius: 30,
        shadowColor: "orange",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24,
    },
    containerTop: {
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 70,
        marginBottom: 0
    },
    topHeader: {
        color: "white",
        fontSize: 30,
        fontWeight: "500",
        marginBottom: 20

    },
    topText: {
        color: "white",
        fontSize: 18,
        fontWeight: "100",
    },
    form: {
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    texts: {
        color: "white",
        fontSize: 18
    },
    inputbox: {
        height: 40,
        width: 300,
        marginBottom: 40,
        paddingHorizontal: 20,
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: "#2f2f2f",
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
});

export default SignUpWorkshop;