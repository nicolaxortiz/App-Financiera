import React from "react";

const UseMeStates = () => {
  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [totalGanancias, setTotalGanancias] = React.useState(0);
  const [totalGastos, setTotalGastos] = React.useState(0);
  const [userID, setUserID] = React.useState("");
  return {
    modalDelete,
    setModalDelete,
    modalAdd,
    setModalAdd,
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
  };
};

export default UseMeStates;
