import React, { useState } from "react";
import AddProduct from "../components/AddProduct";
import API from "../utils/API";
import ViewProducts from "../components/ViewProducts";
import TopBar from "../components/TopBar";

const Products = () => {
  const [addProductsVisible, setAddProductsVisible] = useState(false);
  return (
    <div>
      <TopBar
        addProductsVisible={addProductsVisible}
        setAddProductsVisible={setAddProductsVisible}
      />
      <AddProduct
        addProductsVisible={addProductsVisible}
        setAddProductsVisible={setAddProductsVisible}
      />
      <ViewProducts />
    </div>
  );
};

export default Products;
