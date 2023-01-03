import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../context/UseContext";
import { doc, deleteDoc } from "firebase/firestore";
import UseFireBase from "../data/firebaseConfig";

export default function DeleteCuenta({ cuenta }) {
  const { setModalDelete, modalDelete, refresh, setRefresh } =
    React.useContext(UseContext);

  const deleteData = async () => {
    if (cuenta.nombre == "General") {
      setModalDelete(!modalDelete);
    } else {
      const { db } = UseFireBase();
      await deleteDoc(doc(db, "Cuentas", cuenta.id));
      setModalDelete(!modalDelete);
      setRefresh(!refresh);
    }
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
        <Text style={styles.Titulo}>¿Desea eliminar esta cuenta?</Text>
        <View style={styles.botones}>
          <Pressable
            style={styles.press2}
            onPress={() => {
              setModalDelete(!modalDelete);
            }}
          >
            <Text>Cancelar</Text>
          </Pressable>

          <TouchableHighlight
            style={styles.press}
            activeOpacity={1}
            underlayColor="#BDD4E6"
            onPress={() => {
              deleteData();
            }}
          >
            <Text>Eliminar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botones: {
    flexDirection: "row",
    alignContent: "flex-start",
  },
  box: {
    backgroundColor: "#fff",
    width: horizontalScale(260),
    height: verticalScale(140),
    borderWidth: 3,
    borderColor: "#EBE4F4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(380),
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
});
