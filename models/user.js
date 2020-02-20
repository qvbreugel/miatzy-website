const connection = require("../config/connection"); // import the connection from the config to the database to make db queries

// Build a user Model to export to the controllers
const User = {
  selectAll: cb => {
    const queryString =
      "SELECT u.user_id, u.username, u.access_id, u.ticketnumber, u.email, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id ORDER BY u.user_id ASC;";
    connection.query(queryString, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },
  selectUnique: cb => {
    console.log("Unique Called");
    const queryString = "SELECT username, ticketnumber, email FROM users";
    connection.query(queryString, (err, results) => {
      if (err) throw err;
      console.log(results);
      cb(results);
    });
  },
  getUserByUsernameWithPassword: (username, done) => {
    const queryString =
      "SELECT u.user_id, u.username, u.firstname, u.username,u.password, u.access_id, a.type, u.ticketnumber, u.products_registered FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE username=? LIMIT 1;";
    connection.execute(queryString, [username], (err, user) => {
      if (err) {
        return done(err, user);
      }
      return done(null, user[0]);
    });
  },
  getUserById: (id, done) => {
    const queryString =
      "SELECT u.user_id, u.username, u.firstname, u.lastname, u.access_id, u.ticketnumber, u.products_registered, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE user_id=? LIMIT 1;";
    connection.execute(queryString, [id], (err, user) => {
      if (err) {
        return done(err, user);
      }
      return done(null, user[0]);
    });
  },
  selectOneById: (id, cb) => {
    const queryString =
      "SELECT u.user_id, u.username, u.access_id, u.ticketnumber, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE user_id=? LIMIT 1;";
    connection.execute(queryString, [id], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },
  selectOneByUsername: (username, cb) => {
    const queryString =
      "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE username=? LIMIT 1;";
    connection.execute(queryString, [username], (err, results) => {
      if (err) throw err;
      cb(results);
    });
  },
  deleteOne: (id, cb) => {
    const queryString = "DELETE FROM users WHERE user_id=?;";
    connection.execute(queryString, [id], (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: (vals, cb) => {
    console.log(vals);
    const queryString =
      "INSERT INTO users (firstname, lastname, username, password, email, ticketnumber, access_id) VALUES (?,?,?,?,?,?,?)";
    connection.execute(queryString, vals, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  updateOne: (vals, id, cb) => {
    vals.push(id);
    const queryString =
      "UPDATE users SET username=?, password=?, access_id=? WHERE user_id=?;";
    connection.execute(queryString, vals, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  updateTicketnumber: (vals, cb) => {
    console.log(vals);
    const queryString = "UPDATE users SET ticketnumber=? WHERE user_id=?;";
    connection.execute(queryString, vals, (err, result) => {
      if (err) throw err;
      else {
        const secondQueryString =
          "UPDATE products SET ticketnumber = ? WHERE created_by_user = ?";
        connection.execute(secondQueryString, vals, (err, result) => {
          if (err) throw err;
          cb(result);
        });
      }
    });
  }
};
module.exports = User;
