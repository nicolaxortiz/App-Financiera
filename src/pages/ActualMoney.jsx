import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../context/UseContext";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import UseFireBase from "../data/firebaseConfig";
import DeleteCuenta from "../components/DeleteCuenta";

export default function ActualMoney() {
  const {
    setRefresh,
    setSelectedCuenta,
    refresh,
    userID,
    setModalDelete,
    modalDelete,
    data,
    setData,
  } = React.useContext(UseContext);

  const [actCuenta, setActCuenta] = React.useState({});

  const navigation = useNavigation();
  const [cuentas, setCuentas] = React.useState([]);

  React.useEffect(() => {
    const { db } = UseFireBase();
    const q = query(
      collection(db, "Cuentas"),
      orderBy("dinero", "desc"),
      where("id_user", "==", userID)
    );

    let ArrayCuentas = [];

    const getCuentas = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        ArrayCuentas.push({
          id: doc.id,
          id_user: doc.data().id_user,
          nombre: doc.data().nombre,
          dinero: doc.data().dinero,
        });
      });

      if (!ArrayCuentas.length) {
        console.log("Creando first");
        const addFirst = async () => {
          const firsCuenta = {
            id_user: userID,
            nombre: "General",
            dinero: 0,
          };
          const { db } = UseFireBase();
          await addDoc(collection(db, "Cuentas"), firsCuenta);
          setRefresh(!refresh);
        };
        addFirst();
      }

      setCuentas(ArrayCuentas);
      if (!cuentas.length) {
        setRefresh(!refresh);
      }
    };
    getCuentas();

    const updateCuenta = async (id, total) => {
      const cuentaRef = doc(db, "Cuentas", id);

      await updateDoc(cuentaRef, {
        dinero: total,
      });
    };

    cuentas.forEach((cuenta) => {
      let gananciasCuenta = 0;
      let gastosCuenta = 0;
      console.log(cuenta.nombre);
      data.forEach((mov) => {
        if (cuenta.id == mov.cuenta) {
          if (mov.tipo == "Ganancia") {
            gananciasCuenta = gananciasCuenta + mov.monto;
          } else {
            gastosCuenta = gastosCuenta + mov.monto;
          }
        }
      });
      updateCuenta(cuenta.id, gananciasCuenta - gastosCuenta);
    });
  }, [refresh]);

  const formatoNumber = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = "$1.";
    return number.toString().replace(exp, rep);
  };

  const deleteCuenta = () => {};

  return (
    <View>
      <View style={styles.container}>
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("newCuenta", { page: "ActualMoney" });
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.txt}>Crear nueva cuenta</Text>
              <Image
                source={{ uri: "https://i.imgur.com/m50I9o1.png" }}
                style={styles.img}
              ></Image>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.container}>
          {cuentas.map((item) => {
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  setSelectedCuenta(item);
                  navigation.navigate("cuentaInfo");
                }}
                onLongPress={() => {
                  setModalDelete(!modalDelete);
                  setActCuenta(item);
                }}
              >
                <View style={styles.box}>
                  <Text style={styles.titulo}>{item.nombre}</Text>
                  <Text style={styles.subtitulo}>
                    ${formatoNumber(item.dinero)}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      {modalDelete && <View style={styles.tapadera}></View>}
      {modalDelete && <DeleteCuenta cuenta={actCuenta} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingHorizontal: horizontalScale(15),
    paddingTop: verticalScale(10),
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  box: {
    backgroundColor: "#D4D4D4",
    padding: moderateScale(20),
    borderRadius: 15,
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  titulo: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: moderateScale(12),
  },

  img: {
    width: horizontalScale(16),
    height: verticalScale(16),
    resizeMode: "contain",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(20),
    backgroundColor: "#CDE9FF",
    alignSelf: "flex-start",
    padding: moderateScale(10),
    borderRadius: 10,
  },
  txt: {
    fontSize: moderateScale(16),
    marginRight: horizontalScale(5),
  },

  tapadera: {
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
});
