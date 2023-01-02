import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  TouchableHighlight,
} from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../context/UseContext";

export default function Gastos({ item }) {
  const { setModalDelete, modalDelete, setSelectedItem } =
    React.useContext(UseContext);

  const formatoNumber = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = "$1.";
    return number.toString().replace(exp, rep);
  };

  return (
    <View>
      <TouchableHighlight
        onLongPress={() => {
          setModalDelete(!modalDelete);
          setSelectedItem(item.id);
        }}
        delayLongPress={300}
        underlayColor={"transparent"}
      >
        <View style={styles.box}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.txtValor}>${formatoNumber(item.monto)}</Text>
            <Text style={styles.txtFecha}>{item.fecha}</Text>
          </View>

          <Text style={styles.txtDescripcion}>{item.descripcion}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.txtGasto}>{item.tipo}</Text>
            <Text style={styles.txtCuenta}>Cuenta: {item.nombre_cuenta}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#D4D4D4",
    marginHorizontal: 25,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginBottom: verticalScale(12),
  },

  txtFecha: {
    fontSize: moderateScale(13),
    marginRight: horizontalScale(10),
  },

  txtValor: {
    marginLeft: horizontalScale(13),
    fontSize: moderateScale(18),
    fontWeight: "bold",
  },

  txtDescripcion: {
    fontSize: moderateScale(14),
    color: "#606060",
    marginHorizontal: horizontalScale(15),
    marginVertical: verticalScale(7),
  },

  txtGasto: {
    fontSize: moderateScale(12),
    marginHorizontal: horizontalScale(15),
  },

  txtCuenta: {
    fontSize: moderateScale(12),
    marginRight: horizontalScale(10),
    color: "#606060",
  },

  img: {
    width: horizontalScale(40),
    height: verticalScale(40),
    marginRight: horizontalScale(10),
  },
});
