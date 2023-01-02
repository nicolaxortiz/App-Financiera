import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import UseFireBase from "../data/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { UseContext } from "../context/UseContext";

export default function Login() {
  const [login, setLogin] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserID(uid);
        setRefresh(!refresh);
        navigation.navigate("Home");
      } else {
      }
    });
  }, []);

  const { userID, setUserID, refresh, setRefresh } =
    React.useContext(UseContext);

  const navigation = useNavigation();
  const { auth } = UseFireBase();

  const btnLogin = (login) => {
    const { email, password } = login;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        setError("*Tus datos son incorrectos!*");
      });
  };

  return (
    <View style={styles.view}>
      <Text style={styles.txtInput}>Correo Electronico:</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Ingresa tu Email"
        cursorColor="#CDE9FF"
        onChangeText={(text) => {
          setLogin({ ...login, email: text });
        }}
      />

      <Text style={styles.txtInput}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="*********"
        cursorColor="#CDE9FF"
        onChangeText={(text) => {
          setLogin({ ...login, password: text });
        }}
        secureTextEntry={true}
      />
      {!!error.length && <Text style={styles.txtError}>{error}</Text>}
      <Pressable
        style={styles.press}
        onPress={() => {
          btnLogin(login);
        }}
      >
        <Text style={{ fontSize: moderateScale(15) }}>Iniciar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignSelf: "center",
    marginTop: verticalScale(25),
  },

  input: {
    height: verticalScale(40),
    width: horizontalScale(250),
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#000",
  },

  txtInput: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    marginTop: verticalScale(15),
  },

  press: {
    backgroundColor: "#CDE9FF",
    padding: moderateScale(10),
    borderRadius: 10,
    marginHorizontal: horizontalScale(15),
    alignSelf: "center",
    marginTop: verticalScale(25),
  },

  txtError: {
    alignSelf: "center",
    marginTop: verticalScale(25),
    fontSize: moderateScale(16),
    color: "#F05C5C",
  },
});
