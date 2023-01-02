import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../context/UseContext";
import { useNavigation } from "@react-navigation/native";

export default function Addsome() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("addSome");
      }}
    >
      <View style={styles.box}>
        <Text style={styles.txt}>Añadir</Text>
        <Image
          source={{ uri: "https://i.imgur.com/m50I9o1.png" }}
          style={styles.img}
        ></Image>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  img: {
    width: horizontalScale(16),
    height: verticalScale(16),
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
    backgroundColor: "#CDE9FF",
    alignSelf: "flex-start",
    marginLeft: horizontalScale(30),
    padding: moderateScale(10),
    borderRadius: 10,
  },
  txt: {
    fontSize: moderateScale(16),
    marginRight: horizontalScale(5),
  },
});
