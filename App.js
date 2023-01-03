import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/pages/HomeScreen";
import ActualMoney from "./src/pages/ActualMoney";
import ActualGastos from "./src/pages/ActualGastos";
import { UseContext } from "./src/context/UseContext";
import UseMeStates from "./src/hooks/UseMeStates";
import Login from "./src/pages/Login.jsx";
import AddGasto from "./src/pages/AddGasto";
import SelectCuenta from "./src/pages/SelectCuenta";
import NewCuenta from "./src/pages/NewCuenta";
import CuentaInfo from "./src/pages/CuentaInfo";

const Stack = createNativeStackNavigator();

export default function App() {
  const initial = UseMeStates();
  return (
    <UseContext.Provider value={initial}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#EBE4F4",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 23,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Bienvenidx a tu App Financiera",
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Mi Billetera",
            }}
          />

          <Stack.Screen
            name="addSome"
            component={AddGasto}
            options={{
              title: "Añadir Movimiento",
            }}
          />

          <Stack.Screen
            name="selectCuenta"
            component={SelectCuenta}
            options={{
              title: "Selecciona la cuenta",
            }}
          />

          <Stack.Screen
            name="miDinero"
            component={ActualMoney}
            options={{
              title: "Mi Dineros",
            }}
          />

          <Stack.Screen
            name="miGasto"
            component={ActualGastos}
            options={{
              title: "Mis Gastos",
            }}
          />

          <Stack.Screen
            name="newCuenta"
            component={NewCuenta}
            options={{
              title: "Crea tu nueva cuenta",
            }}
          />

          <Stack.Screen
            name="cuentaInfo"
            component={CuentaInfo}
            options={{
              title: "Movimientos de tu cuenta",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UseContext.Provider>
  );
}
