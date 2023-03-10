import React from "react";

const UseMeStates = () => {
  const [modalDelete, setModalDelete] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [totalGanancias, setTotalGanancias] = React.useState(0);
  const [totalGastos, setTotalGastos] = React.useState(0);
  const [userID, setUserID] = React.useState("");
  const [selectedCuenta, setSelectedCuenta] = React.useState({});
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  return {
    modalDelete,
    setModalDelete,
    refresh,
    setRefresh,
    selectedItem,
    setSelectedItem,
    totalGanancias,
    setTotalGanancias,
    totalGastos,
    setTotalGastos,
    userID,
    setUserID,
    selectedCuenta,
    setSelectedCuenta,
    search,
    setSearch,
    data,
    setData,
  };
};

export default UseMeStates;
