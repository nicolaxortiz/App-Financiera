import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import Gastos from "../components/Gastos";
import Constants from "expo-constants";
import Estado from "../components/Estado";
import Addsome from "../components/Addsome";
import ModalDelete from "../components/ModalDelete";
import AddGasto from "./AddGasto";
import { UseContext } from "../context/UseContext";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import UseFireBase from "../data/firebaseConfig";
import { verticalScale } from "../themes/Metrics";

export default function HomeScreen() {
  const { modalDelete, refresh, setTotalGanancias, setTotalGastos, userID } =
    React.useContext(UseContext);

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  let querySnapshot;
  let ArrayItems = [];

  React.useEffect(() => {
    const { db } = UseFireBase();
    const getData = async () => {
      const q = query(
        collection(db, "Movimientos"),
        orderBy("timestamp", "desc"),
        where("id_user", "==", userID)
      );

      querySnapshot = await getDocs(q);

      let ganancias = 0;
      let gastos = 0;
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

        if (doc.data().tipo === "Ganancia") {
          ganancias = ganancias + doc.data().monto;
        } else {
          gastos = gastos + doc.data().monto;
        }
      });
      setTotalGanancias(ganancias);
      setTotalGastos(gastos);
      setData(ArrayItems);
      setLoading(false);
    };

    getData();
  }, [refresh]);

  const renderItem = ({ item }) => {
    return <Gastos key={item.id} item={item} />;
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <View style={styles.view}>
        <Estado />
        <Addsome />
        <View style={{ flex: 1, marginVertical: verticalScale(15) }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      {modalDelete && <View style={styles.tapadera}></View>}
      {modalDelete && <ModalDelete />}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  tapadera: {
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
});
