import React, { useEffect, useState } from "react";
import { Table, Divider } from "antd";
import API from "../utils/API";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Price",
    key: "price",
    dataIndex: "price"
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <span>
        <a>Edit</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
];

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    API.getAllProductsById().then(res => setProducts(res));
  }, []);
  return <Table columns={columns} dataSource={products} />;
};

export default ViewProducts;
