const connection = require("../config/connection");

const Product = {
  selectAll: cb => {
    const queryString =
      "SELECT id, name, category, description, price, ticketnumber, product_id FROM users ORDER BY id ASC;";
    connection.query(queryString, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },
  selectAllById: (id, cb) => {
    const queryString =
      "SELECT id, name, category, origin, language, description, price, ticketnumber, product_id, created_by_user FROM products WHERE created_by_user=? ORDER BY id ASC;";
    connection.query(queryString, [id], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },
  insertOne: (vals, cb) => {
    const queryString =
      "INSERT INTO products (name, category, origin, language, description, price, ticketnumber, created_by_user) VALUES (?,?,?,?,?,?,?,?)";
    connection.execute(queryString, vals, (err, result) => {
      if (err) throw err;
      else {
        const userId = [vals[7]];
        const secondQueryString =
          "UPDATE users SET products_registered = products_registered + 1 WHERE user_id = ?";
        connection.execute(secondQueryString, userId, (err, result) => {
          if (err) throw err;
          cb(result);
        });
      }
    });
  },
  deleteOne: (data, cb) => {
    console.log(data);
    const product_id = data["id"];
    const user_id = data["user_id"];

    const queryString = "DELETE FROM products WHERE id=?;";
    connection.execute(queryString, [product_id], (err, result) => {
      if (err) throw err;
      else {
        const secondQueryString =
          "UPDATE users SET products_registered = products_registered - 1 WHERE user_id = ?";
        connection.execute(secondQueryString, [user_id], (err, result) => {
          if (err) throw err;
          cb(result);
        });
      }
    });
  },
  updateOne: (vals, cb) => {
    const queryString =
      "UPDATE  products SET name = ?, category = ?, origin = ?, language = ?, description = ?, price = ? WHERE id = ?";
    connection.execute(queryString, vals, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = Product;
