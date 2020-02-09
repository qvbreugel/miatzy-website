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
      "SELECT id, name, category, description, price, ticketnumber, product_id FROM products WHERE created_by_user=? ORDER BY id ASC;";
    connection.query(queryString, [id], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },
  insertOne: (vals, cb) => {
    console.log(vals);
    const queryString =
      "INSERT INTO products (name, category, origin, language, description, price, ticketnumber, created_by_user) VALUES (?,?,?,?,?,?,?,?)";
    connection.execute(queryString, vals, (err, result) => {
      if (err) throw err;
      const secondQueryString =
        "UPDATE users SET products_registered = products_registered + 1 WHERE user_id = ?";
      cb(result);
    });
  }
};

module.exports = Product;
