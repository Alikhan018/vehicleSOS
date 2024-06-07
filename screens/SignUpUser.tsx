import { Text, View, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpUser = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNum, setPhoneNum] = useState("");


    const handleSignUp = async () => {
        try {
            const result = await fetch(`${API_URL}/api/auth/signupUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname, lastname, username, email, password, phoneNum })
            });
            const data = await result.json();
            const token = data.token
            await AsyncStorage.setItem("token", token)
        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <ScrollView style={styles.back}>
            <View style={styles.backbox}>
                <View style={styles.containerTop}>
                    <Text style={styles.topHeader}>Signup</Text>
                    <Text style={styles.topText}>Submit the form below to register your account.</Text>
                </View>
                <SafeAreaView style={styles.form}>
                    <View>
                        <Text style={styles.texts}>Enter First Name</Text>
                        <TextInput
                            style={[styles.inputbox, { color: "#cccccc" }]} placeholder="First Name" placeholderTextColor={"#cccccc"} value={firstname} onChangeText={(text) => { setFirstname(text) }}
                        ></TextInput>
                    </View>
                    <View>
                        <Text style={styles.texts}>Enter Last Name</Text>
                        <TextInput
                            style={[styles.inputbox, { color: "#cccccc" }]} placeholder="Last Name" placeholderTextColor={"#cccccc"}
                            value={lastname} onChangeText={(text) => { setLastname(text) }}
                        >

                        </TextInput>
                    </View>
                    <View>
                        <Text style={styles.texts}>Enter Username</Text>
                        <TextInput style={[styles.inputbox, { color: "#cccccc" }]} placeholder="Username" placeholderTextColor={"#cccccc"}
                            value={username} onChangeText={(text) => { setUsername(text) }}
                        ></TextInput>
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: "black",
        // justifyContent: "center",
    },
    backbox: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
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
        marginBottom: 0,
        padding: 5
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
        fontSize: 18,
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

export default SignUpUser;