import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  TextInput,
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
  const { setSearch } = React.useContext(UseContext);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#BDD4E6"
        onPress={() => {
          navigation.navigate("addSome");
        }}
        style={styles.box}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.txt}>Añadir</Text>
          <Image
            source={{ uri: "https://i.imgur.com/m50I9o1.png" }}
            style={styles.img}
          ></Image>
        </View>
      </TouchableHighlight>

      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setSearch(text);
        }}
        placeholder="¿Buscas algo en especial?"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: horizontalScale(16),
    height: verticalScale(16),
    resizeMode: "contain",
  },
  box: {
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
  input: {
    height: verticalScale(40),
    width: horizontalScale(220),
    marginTop: verticalScale(20),
    borderWidth: 1,
    padding: 10,
    color: "#000",
    borderRadius: 10,
    borderWidth: 1.5,
    marginLeft: horizontalScale(15),
  },
});
