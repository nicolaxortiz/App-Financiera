import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import UseFireBase from "../data/firebaseConfig";
import { UseContext } from "../context/UseContext";

export default function NewCuenta() {
  const { userID, setRefresh, refresh } = React.useContext(UseContext);
  const navigation = useNavigation();
  const [cuenta, setCuenta] = React.useState({
    id_user: userID,
    nombre: "",
    dinero: 0,
  });

  const btnGuardar = async () => {
    const { db } = UseFireBase();
    await addDoc(collection(db, "Cuentas"), cuenta);
    setRefresh(!refresh);
    navigation.navigate("selectCuenta");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Ingresa el nombre de la nueva cuenta</Text>
      <View style={styles.box}>
        <Text style={styles.subtitulo}>
          Luego podras añadir nuevos movimientos a esta cuenta :)
        </Text>

        <Text style={styles.txtInput}>Nombre:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ej: Ahorros"
          cursorColor="#CDE9FF"
          onChangeText={(text) => {
            setCuenta({ ...cuenta, nombre: text });
          }}
        />
      </View>
      <View style={styles.botones}>
        <Pressable
          style={styles.press2}
          onPress={() => {
            navigation.navigate("selectCuenta");
          }}
        >
          <Text>Cancelar</Text>
        </Pressable>
        <Pressable
          style={styles.press}
          onPress={() => {
            btnGuardar();
          }}
        >
          <Text>Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: verticalScale(25),
  },

  box: {
    alignSelf: "center",
  },

  Titulo: {
    fontSize: moderateScale(20),
    alignSelf: "center",
    fontWeight: "bold",
  },

  subtitulo: {
    marginBottom: verticalScale(30),
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
  },

  input: {
    height: verticalScale(40),
    width: horizontalScale(250),
    margin: 12,
    borderWidth: 1.5,
    padding: 10,
    color: "#000",
    borderRadius: 10,
  },

  txtInput: {
    fontSize: moderateScale(13),
    fontWeight: "bold",
  },

  press: {
    backgroundColor: "#CDE9FF",
    padding: moderateScale(10),
    borderRadius: 10,
    marginHorizontal: horizontalScale(15),
  },

  press2: {
    padding: moderateScale(10),
    marginHorizontal: horizontalScale(15),
  },

  botones: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(25),
  },
});
