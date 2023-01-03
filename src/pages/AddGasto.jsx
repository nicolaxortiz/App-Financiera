import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../context/UseContext";
import { collection, addDoc, getDocs } from "firebase/firestore";
import UseFireBase from "../data/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function AddGasto() {
  const { refresh, setRefresh, userID, selectedCuenta } =
    React.useContext(UseContext);
  const [valueNumber, setValueNumber] = React.useState();
  const [error, setError] = React.useState(false);

  const navigation = useNavigation();

  const [form, setForm] = React.useState({});

  React.useEffect(() => {
    setForm({
      id_user: userID,
      monto: 0,
      descripcion: "",
      fecha: "",
      timestamp: 0,
      tipo: "",
      cuenta: selectedCuenta.id,
      nombre_cuenta: selectedCuenta.nombre,
    });
  }, [selectedCuenta]);

  const formatoNumber = (number) => {
    const cadena = number.split(".").join("");
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = "$1.";
    return cadena.toString().replace(exp, rep);
  };

  const parseDate = (date) => {
    let fixDate = date.split("/");
    return fixDate[1] + "/" + fixDate[0] + "/" + fixDate[2];
  };

  const btnGuardar = async () => {
    if (!(Object.entries(selectedCuenta).length === 0)) {
      const { db } = UseFireBase();
      await addDoc(collection(db, "Movimientos"), form);
      setRefresh(!refresh);
      setError(false);
      navigation.navigate("Home");
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Ingresa el nuevo movimiento</Text>

      <View style={{ alignSelf: "center" }}>
        <Text style={styles.txtInput}>Cuenta:</Text>

        <Pressable
          style={styles.input}
          onPress={() => {
            navigation.navigate("selectCuenta");
          }}
        >
          <Text>{selectedCuenta.nombre}</Text>
        </Pressable>

        <Text style={styles.txtInput}>Monto:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="$$$"
          cursorColor="#CDE9FF"
          onChangeText={(text) => {
            setForm({ ...form, monto: parseInt(text.split(".").join("")) });
            setValueNumber(formatoNumber(text));
          }}
          value={valueNumber}
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
      {error && (
        <Text style={styles.txtError}>
          *Debes digitar la cuenta a la cual generar el monto*
        </Text>
      )}
      <View style={styles.botones}>
        <Pressable
          style={styles.press2}
          onPress={() => {
            setForm({});
            navigation.navigate("Home");
          }}
        >
          <Text>Cancelar</Text>
        </Pressable>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="#BDD4E6"
          style={styles.press}
          onPress={() => {
            btnGuardar();
          }}
        >
          <Text>Guardar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    padding: moderateScale(30),
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingTop: verticalScale(25),
  },

  botones: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(25),
  },

  Titulo: {
    fontSize: moderateScale(20),
    marginBottom: verticalScale(30),
    alignSelf: "center",
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

  txtError: {
    alignSelf: "center",
    marginTop: verticalScale(25),
    fontSize: moderateScale(12),
    color: "#F05C5C",
  },
});
