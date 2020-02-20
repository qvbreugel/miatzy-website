import React, { useEffect, useState } from "react";
import { Checkbox, Table, Divider, Popconfirm, message } from "antd";
import API from "../utils/API";

const ViewProducts = props => {
  const [products, setProducts] = useState([]);

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number"
    },
    {
      title: "Product",
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

  let pagination = { position: "bottom" };
  let actionSpan = 1;

  if (props.type === "print") {
    pagination = false;
    columns.pop();
    columns.splice(2, 2);
    columns.push({
      title: "Unsold",
      key: "unsold",
      render: () => <Checkbox />
    });
  }

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

  useEffect(() => {
    API.getAllProductsById().then(res => {
      let fetchedProducts = [];
      console.log(res);
      res.map((product, index) => {
        product["key"] = product.id;
        product["number"] = index + 1;
        fetchedProducts.push(product);
      });
      setProducts(fetchedProducts);
      if (props.type === "print") {
        props.setLoading(false);
      }
    });
  }, [props.refreshToggle]);
  return (
    <Table
      columns={columns}
      dataSource={products}
      pagination={pagination}
      loading={props.loading}
    />
  );
};

export default ViewProducts;
