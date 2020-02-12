import React, { useEffect, useState } from "react";
import { Table, Divider, Popconfirm, message } from "antd";
import API from "../utils/API";

const ViewProducts = props => {
  const [products, setProducts] = useState([]);

  const deleteProduct = product => {
    const data = { id: product.id, user_id: product.created_by_user };
    API.deleteProduct(data).then(res => {
      if ((res.status = 200)) {
        props.toggleRefresh();
        message.success("The product has been deleted");
      }
    });
  };

  const editProduct = product => {
    props.setSelectedProduct(product);
    props.setEditProductsVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
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
      dataIndex: "price",
      render: (text, record) => <p>€{text.toFixed(2)}</p>
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a onClick={() => editProduct(record)}>Edit</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure you want to delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record)}
            placement="left"
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  useEffect(() => {
    API.getAllProductsById().then(res => {
      let fetchedProducts = [];
      res.map(product => {
        console.log(product);
        product["key"] = product.id;
        fetchedProducts.push(product);
      });
      setProducts(fetchedProducts);
    });
  }, [props.refreshToggle]);
  return <Table columns={columns} dataSource={products} />;
};

export default ViewProducts;
