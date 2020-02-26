import React, { useState, useEffect } from "react";
import AddProduct from "../components/AddProduct";
import ViewProducts from "../components/ViewProducts";
import TopBar from "../components/TopBar";
import { Redirect } from "react-router-dom";
import EditProduct from "../components/EditProduct";
import ChangeTicketnumber from "../components/ChangeTicketnumber";
import { notification, message } from "antd";

const Products = props => {
  const [addProductsVisible, setAddProductsVisible] = useState(false);
  const [editProductsVisible, setEditProductsVisible] = useState(false);
  const [changeTicketnumberVisible, setChangeTicketnumberVisible] = useState(
    false
  );
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    category: "",
    origin: "",
    language: "",
    description: "",
    price: 0
  });
  const [refreshToggle, setRefreshToggle] = useState(false);

  const toggleRefresh = () => {
    setRefreshToggle(!refreshToggle);
  };

  useEffect(() => {
    notification.warning({
      message: "Signup period",
      description:
        "Products can only be added until May 1 20:00. All products added after that date, will not be accepted at the convention.",
      duration: 0
    });
  }, []);

  if (props.user.access_id > 0) {
    return (
      <div>
        <TopBar
          addProductsVisible={addProductsVisible}
          setAddProductsVisible={setAddProductsVisible}
          setChangeTicketnumberVisible={setChangeTicketnumberVisible}
          setUser={props.setUser}
          user={props.user}
        />
        <AddProduct
          addProductsVisible={addProductsVisible}
          setAddProductsVisible={setAddProductsVisible}
          setUser={props.setUser}
          user={props.user}
          toggleRefresh={toggleRefresh}
        />
        <EditProduct
          editProductsVisible={editProductsVisible}
          setEditProductsVisible={setEditProductsVisible}
          setUser={props.setUser}
          user={props.user}
          toggleRefresh={toggleRefresh}
          selectedProduct={selectedProduct}
        />
        <ChangeTicketnumber
          changeTicketnumberVisible={changeTicketnumberVisible}
          setChangeTicketnumberVisible={setChangeTicketnumberVisible}
          user={props.user}
        />
        <ViewProducts
          user={props.user}
          refreshToggle={refreshToggle}
          toggleRefresh={toggleRefresh}
          setEditProductsVisible={setEditProductsVisible}
          setSelectedProduct={setSelectedProduct}
          type="view"
        />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Products;
