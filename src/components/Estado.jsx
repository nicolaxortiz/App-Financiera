import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../context/UseContext";

export default function Estado() {
  const navigation = useNavigation();
  const { totalGanancias, totalGastos } = React.useContext(UseContext);

  const formatoNumber = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = "$1.";
    return number.toString().replace(exp, rep);
  };

  return (
    <View style={styles.banner}>
      <View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: moderateScale(18) }}>
            Ganancias
          </Text>
          <Text style={{ fontSize: moderateScale(18) }}>
            ${formatoNumber(totalGanancias)}
          </Text>
        </View>

        <View style={{ alignItems: "center", marginTop: moderateScale(15) }}>
          <Text style={{ fontWeight: "bold", fontSize: moderateScale(18) }}>
            Gastos
          </Text>
          <Text style={{ fontSize: moderateScale(18) }}>
            ${formatoNumber(totalGastos)}
          </Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("miDinero")}
        >
          <View style={{ alignItems: "center", marginTop: moderateScale(15) }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: moderateScale(18),
              }}
            >
              Total
            </Text>
            <Text style={{ fontSize: moderateScale(18) }}>
              ${formatoNumber(totalGanancias - totalGastos)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Image
        source={{ uri: "https://i.imgur.com/0jl1zhN.png" }}
        style={styles.imgLogo}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  imgLogo: {
    width: horizontalScale(180),
    height: verticalScale(180),
    resizeMode: "contain",
  },

  titulo: {
    fontSize: moderateScale(22),
    padding: moderateScale(20),
    fontWeight: "bold",
    backgroundColor: "#EBE4F4",
  },

  banner: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(0),
    alignItems: "center",
  },
});
