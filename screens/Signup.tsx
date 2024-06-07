import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import { useState, useMemo } from "react";

const SignUp = ({ navigation }) => {
  const Radio = useMemo(() => ([
    {
      id: "1",
      label: "Workshop Owner",
      value: "Workshop",
      color: "cyan"
    },
    {
      id: "2",
      label: "User",
      value: "User",
      color: "cyan"
    }
  ]), []);
  const [option, setOption] = useState<string | undefined>("")
  // console.log(option);
  return (
    <View style={styles.backbox} >
      <SafeAreaView style={styles.container} >
        <View>
          <Text style={styles.texttop}>Sign Up</Text>
        </View>
        <View style={styles.innerbox} >
          <Text style={styles.texts}>You are a :</Text>
          <RadioGroup
            radioButtons={Radio}
            layout="row"
            onPress={(select) => {
              // console.log(select);
              setOption(select);
              if (select === "2") {
                navigation.navigate("SignUpUser")
              }
              else {
                navigation.navigate("SignUpWorkshop")
              }
              // console.log(option);
            }}
            selectedId={option}
            labelStyle={styles.placeHolder}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  backbox: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    height: "70%",
    width: "80%",
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
  texts: {
    color: "white",
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
  },
  innerbox: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "20%"
  },
  texttop: {
    color: "white",
    fontSize: 48,
    fontWeight: "700",
  },
  placeHolder: {
    color: "white",
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "300",
  }
});

export default SignUp;