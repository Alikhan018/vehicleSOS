import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Overlay } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Map = ({ navigation }) => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [address, setAddress] = useState([])
  const [carname, setcarName] = useState("");

  const handleClick = async () => {
    let x = initialRegion.latitude;
    let y = initialRegion.longitude;
    const token = await AsyncStorage.getItem("token")
    if (!token) navigation.navigate('LoginUser')
    try {
      let response = await fetch(`${API_URL}/api/location/sendLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ x, y, carname })
      });
      // console.log(x, y)
      let d = await response.json();
      if (d.message === "Address Sent") {
        Alert.alert('Success', `The address has been sent. Soon a workshop will contact you. If dont get any response in 10 mins then report again!`, [{ text: " OK", onPress: () => { navigation.goBack(); } }]);
      }
      // console.log(x)
    } catch (err) {
      console.log(err)
    }
    // console.log(response);
  }



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      console.log(carname);
      let location = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      let x = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(x);
      // console.log(initialRegion)
    })();
  }, []);
  return (
    <View style={styles.container}>
      {initialRegion ? (
        <View style={{ flex: 1 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ height: "70%", width: "100%", borderRadius: 25 }}
            initialRegion={initialRegion}
          >
            <Marker
              coordinate={{
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
              }}
              title="Your Location"
            />
          </MapView>
          <SafeAreaView style={styles.lowerBox}>
            {/* <KeyboardAvoidingView> */}
            <View style={styles.addressbox}>
              <Text style={styles.textadd}>Your current location: </Text>
              <Text style={styles.textadd}>
                {address.map(addr => {
                  console.log(addr)
                  let fullAddress = "";
                  if (addr.name) fullAddress += `${addr.name} `;
                  if (addr.street) fullAddress += `${addr.street}, `;
                  // if (addr.city) fullAddress += `${addr.city}, `;
                  if (addr.region) fullAddress += `${addr.region}, `;
                  if (addr.postalCode) fullAddress += `${addr.postalCode}, `;
                  if (addr.country) fullAddress += `${addr.country}`;
                  return fullAddress.trim();
                })}
              </Text>

              <TextInput style={styles.textadd} placeholder='Enter you car name here' placeholderTextColor="white" value={carname} onChangeText={(text) => { setcarName(text); console.log(carname) }}></TextInput>
            </View>
            {/* </KeyboardAvoidingView> */}
            <TouchableOpacity style={styles.Button} onPress={handleClick}>
              {/* <Image source={require("../assets/Img/backbutton.png")} />
               */}
              <View>
                <Text style={styles.textbtn}>Report Broken Car</Text>
              </View>
            </TouchableOpacity>

          </SafeAreaView>
        </View>
      ) : (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  textadd: {
    color: "white",
    fontSize: 14
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
  },
  Button: {
    // position: 'absolute',
    // top: 90,
    // left: 50,
    zIndex: 1,
    width: 200,
    height: 70,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
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
  lowerBox: {
    backgroundColor: "black",
    width: "100%",
    height: "30%",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 25,
  },
  addressbox: {
    backgroundColor: "black",
    width: "70%",
    height: "50%",
    borderRadius: 25,
    justifyContent: "space-evenly",
    flexDirection: "column",
    // alignItems: "center",
    paddingLeft: 25,
    shadowColor: "orange",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.00,
    elevation: 24,
  },
  textbtn: {
    fontSize: 19,
    color: "white"
  }
});

export default Map;
