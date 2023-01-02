import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../context/UseContext";
import { collection, addDoc, getDocs } from "firebase/firestore";
import UseFireBase from "../data/firebaseConfig";

export default function ModalAdd() {
  const { setModalAdd, modalAdd, refresh, setRefresh, userID } =
    React.useContext(UseContext);

  const [form, setForm] = React.useState({
    id_user: userID, //por ahora
    monto: 0,
    descripcion: "",
    fecha: "",
    timestamp: 0,
    tipo: "",
  });

  const parseDate = (date) => {
    let fixDate = date.split("/");
    return fixDate[1] + "/" + fixDate[0] + "/" + fixDate[2];
  };

  const btnGuardar = async () => {
    const { db } = UseFireBase();
    await addDoc(collection(db, "Movimientos"), form);
    setRefresh(!refresh);
    setModalAdd(!modalAdd);
    setForm({});
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        zIndex: 100,
      }}
    >
      <View style={styles.box}>
        <Text style={styles.Titulo}>Ingresa el nuevo movimiento</Text>
        <View>
          <Text style={styles.txtInput}>Monto:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="$$$"
            cursorColor="#CDE9FF"
            onChangeText={(text) => {
              setForm({ ...form, monto: parseInt(text) });
            }}
          />

          <Text style={styles.txtInput}>Descripción:</Text>
          <TextInput
            style={styles.input}
            cursorColor="#CDE9FF"
            onChangeText={(text) => {
              setForm({ ...form, descripcion: text });
            }}
          />

          <Text style={styles.txtInput}>Fecha:</Text>
          <TextInput
            style={styles.input}
            cursorColor="#CDE9FF"
            placeholder="DD/MM/AAAA"
            keyboardType="visible-password"
            onChangeText={(text) => {
              const dateTimeStamp = parseDate(text);
              const saveDate = new Date(dateTimeStamp);
              setForm({ ...form, fecha: text, timestamp: saveDate.getTime() });
            }}
          />
          <View
            style={{ flexDirection: "row", marginVertical: verticalScale(10) }}
          >
            <BouncyCheckbox
              text="Ganancia"
              fillColor="#1F1F3A"
              textStyle={{
                textDecorationLine: "none",
                color: "#000",
              }}
              style={{ marginLeft: horizontalScale(10) }}
              onPress={(isChecked) => {
                isChecked && setForm({ ...form, tipo: "Ganancia" });
              }}
            />

            <BouncyCheckbox
              text="Gasto"
              fillColor="#1F1F3A"
              textStyle={{
                textDecorationLine: "none",
                color: "#000",
              }}
              style={{ marginLeft: horizontalScale(20) }}
              onPress={(isChecked) => {
                isChecked && setForm({ ...form, tipo: "Gasto" });
              }}
            />
          </View>
        </View>
        <View style={styles.botones}>
          <Pressable
            style={styles.press2}
            onPress={() => {
              setModalAdd(!modalAdd);
              setForm({});
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
    </View>
  );
}

const styles = StyleSheet.create({
  botones: {
    flexDirection: "row",
    alignContent: "flex-start",
    marginTop: verticalScale(10),
  },
  box: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#EBE4F4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(80),
    padding: moderateScale(30),
  },
  Titulo: {
    fontSize: moderateScale(20),
    marginBottom: verticalScale(30),
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

  input: {
    height: verticalScale(40),
    width: horizontalScale(250),
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#000",
  },

  txtInput: {
    fontSize: moderateScale(13),
    fontWeight: "bold",
  },
});
