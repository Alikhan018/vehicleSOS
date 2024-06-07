import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={require("./../assets/Img/img.png")}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonT}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>SignUp</Text>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    marginBottom: 20,
    position: "absolute",
  },
  button: {
    position: "absolute",
    bottom: 110,
    backgroundColor: "#2f2f2f",
    padding: 10,
    width: 350,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonT: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#2f2f2f",
    padding: 10,
    width: 350,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
