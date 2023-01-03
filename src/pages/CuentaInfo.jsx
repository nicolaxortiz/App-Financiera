import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { UseContext } from "../context/UseContext";
import Constants from "expo-constants";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import UseFireBase from "../data/firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Gastos from "../components/Gastos";
import ModalDelete from "../components/ModalDelete";

export default function CuentaInfo() {
  const { selectedCuenta, refresh, userID, modalDelete } =
    React.useContext(UseContext);
  const [data, setData] = React.useState([]);

  let querySnapshot;
  let ArrayItems = [];

  React.useEffect(() => {
    const { db } = UseFireBase();
    const getData = async () => {
      const q = query(
        collection(db, "Movimientos"),
        orderBy("timestamp", "desc"),
        where("cuenta", "==", selectedCuenta.id)
      );

      querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        ArrayItems.push({
          id: doc.id,
          id_user: doc.data().id_user,
          monto: doc.data().monto,
          descripcion: doc.data().descripcion,
          tipo: doc.data().tipo,
          fecha: doc.data().fecha,
          cuenta: doc.data().cuenta,
          nombre_cuenta: doc.data().nombre_cuenta,
        });
      });
      setData(ArrayItems);
    };

    getData();
  }, [refresh]);

  const renderItem = ({ item }) => {
    return <Gastos key={item.id} item={item} />;
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: verticalScale(15),
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {modalDelete && <View style={styles.tapadera}></View>}
      {modalDelete && <ModalDelete />}
    </View>
  );
}

const styles = StyleSheet.create({
  tapadera: {
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
});
