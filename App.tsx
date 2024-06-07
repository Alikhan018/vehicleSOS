import { StatusBar, StyleSheet, Text, View, SafeAreaView } from "react-native";
import Login from "./screens/Login";
import LoginUser from "./screens/LoginUser"
import HomeWorkshop from "./screens/HomeWorkshop";
import MapScreenUser from "./screens/MapsScreenUser";
import HomeUser from "./screens/HomeUser";
import LoginWorkshop from "./screens/LoginWorkshop"
import SignUpUser from "./screens/SignUpUser";
import Signup from "./screens/Signup";
import { useFonts } from "expo-font";
import WelcomeScreen from "./screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpWorkshop from "./screens/SignUpWorkshop";
import BrokenCars from "./screens/BrokenCars";
import RenderMapWorkshop from "./screens/RenderMapWorkshop";
import CarParts from "./screens/ViewCarParts";
import Checkout from "./screens/Checkout";
import ViewWorkshops from "./screens/ViewWorkshops";
import ViewParts from "./screens/ViewParts";
import AddParts from "./screens/AddParts";
import ViewOrders from "./screens/ViewOrders"

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
  });
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeWorkshop"
            component={HomeWorkshop}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeUser"
            component={HomeUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapsUser"
            component={MapScreenUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BrokenCars"
            component={BrokenCars}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewParts"
            component={CarParts}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewOrders"
            component={ViewOrders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddParts"
            component={AddParts}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewPartsWorkshop"
            component={ViewParts}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewWorkshop"
            component={ViewWorkshops}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BrokenCarsMap"
            component={RenderMapWorkshop}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginUser"
            component={LoginUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginWorkshop"
            component={LoginWorkshop}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpUser"
            component={SignUpUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpWorkshop"
            component={SignUpWorkshop}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
