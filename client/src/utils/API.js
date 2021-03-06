import axios from "axios";
/* eslint-disable no-console */
export default {
  getLoginStatus: async () => {
    try {
      const res = await axios.get("/api/login/status");
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },
  postUserLogin: async (user, done) => {
    try {
      const res = await axios.post("/api/login", user);
      // Async function for logging in, setting up callback to return two params, ( error: false if no error, res.data: userData from server )
      return res.data.user.username
        ? done(false, res.data)
        : done(false, "error logging in");
    } catch (err) {
      console.log(err);
      return done(true, false);
    }
  },
  getLoggedOut: async () => {
    try {
      const res = await axios.get("/api/logout");
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  postNewUser: async newUser => {
    try {
      const {
        firstname,
        lastname,
        username,
        password,
        email,
        ticketnumber,
        access_id
      } = newUser;
      const res = await axios.post("/api/user", {
        vals: [
          firstname,
          lastname,
          username,
          password,
          email,
          ticketnumber,
          access_id
        ]
      });
      console.log(res);
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  postNewProduct: async newProduct => {
    // Example POST: { "vals": ["test_user", "111111", 1] }

    try {
      const {
        name,
        category,
        origin,
        language,
        description,
        price,
        ticketnumber,
        created_by_user
      } = newProduct;
      const res = await axios.post("/api/product", {
        vals: [
          name,
          category,
          origin,
          language,
          description,
          price,
          ticketnumber,
          created_by_user
        ]
      });
      console.log(res);
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  getAllUsers: async () => {
    try {
      const res = await axios.get("/api/user");
      console.log(res);
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },
  getUniqueValues: async () => {
    try {
      const res = await axios.get("/api/user/unique");
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },
  deleteUserById: async id => {
    try {
      const res = await axios.delete(`api/user/${id}`);
      console.log(res);
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  getAllProductsById: async () => {
    try {
      const res = await axios.get("/api/product");
      console.log(res.data);
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },
  deleteProduct: async data => {
    try {
      const res = await axios.post("/api/product/delete", {
        data
      });
      console.log(res);
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  updateProduct: async updatedProduct => {
    // Example POST: { "vals": ["test_user", "111111", 1] }

    try {
      const {
        name,
        category,
        origin,
        language,
        description,
        price,
        id
      } = updatedProduct;
      const res = await axios.post("/api/product/update", {
        vals: [name, category, origin, language, description, price, id]
      });
      console.log(res);
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  updateTicketnumber: async updatedTicketnumber => {
    try {
      const { ticketnumber, id } = updatedTicketnumber;
      const res = await axios.post("/api/user/ticketnumber", {
        vals: [ticketnumber, id]
      });
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  forgotPassword: async userEmail => {
    try {
      const { email } = userEmail;
      const res = await axios.post("/api/password/forgot", {
        vals: email
      });
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  getUserByToken: async token => {
    try {
      const res = await axios.get(`/api/password/reset/${token}`);
      return res;
    } catch (err) {
      return console.log(err);
    }
  },
  resetPassword: async data => {
    try {
      const { password, token } = data;
      const res = await axios.post("/api/password/reset", {
        vals: [password, token]
      });
      return res;
    } catch (err) {
      return console.log(err);
    }
  }
};
