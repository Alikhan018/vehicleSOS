import {
  View,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginUser = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const API_URL = Constants.manifest2.extra;
  const handlePress = async () => {
    try {
      console.log(API_URL);
      const result = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await result.json();
      console.log(data)
      redirect(data);
    } catch (err) {
      console.log(err);
    }
  };

  async function redirect(data) {
    if (data.message === "Logged In") {
      const token = data.token
      await AsyncStorage.setItem("token", token)
      navigation.navigate("HomeUser");
    } else {
      console.log("Bye");
    }
  }
  return (
    <>
      <View style={styles.backbox}>
        <SafeAreaView style={styles.page}>
          <View>
            <Text style={styles.textOnTop}>User Login</Text>
          </View>
          <View style={styles.loginBox}>
            <View>
              <Text style={styles.texts}>Username</Text>
              <TextInput
                style={[styles.usernameBox, { color: "#cccccc" }]}
                autoFocus
                placeholder="Enter Username"
                placeholderTextColor={"#cccccc"}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                }}
              />
            </View>
            <View>
              <Text style={[styles.texts, { color: "#cccccc" }]}>Password</Text>
              <TextInput
                style={styles.passBox}
                placeholder="Enter Password"
                placeholderTextColor={"#cccccc"}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                disabled={username === "" || password === "" ? true : false}
                onPress={handlePress}
              >
                <Text style={styles.texts}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    height: "70%",
    width: "90%",
    backgroundColor: "black",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
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
  backbox: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  textOnTop: {
    color: "#ffffff",
    fontSize: 32,
    fontFamily: "Montserrat-Black",
  },
  texts: {
    color: "#cccccc",
    fontSize: 22,

    // marginBottom: 10,
  },
  usernameBox: {
    height: 40,
    width: 300,
    marginBottom: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginTop: 10,
  },
  passBox: {
    height: 40,
    width: 300,
    marginBottom: 40,
    paddingHorizontal: 20,
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginTop: 10,
  },
  loginBox: {
    height: "70%",
    width: "90%",
    backgroundColor: "black",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#2f2f2f",
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginUser;
