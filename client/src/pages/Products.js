import React, { useState } from "react";
import AddProduct from "../components/AddProduct";
import ViewProducts from "../components/ViewProducts";
import TopBar from "../components/TopBar";
import { Redirect } from "react-router-dom";
import EditProduct from "../components/EditProduct";
import ChangeTicketnumber from "../components/ChangeTicketnumber";

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
        />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Products;
