import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrintList from "./pages/PrintList";
import NoMatch from "./pages/NoMatch";
import "./App.css";
import Products from "./pages/Products";
import API from "./utils/API";
import PrintProducts from "./pages/PrintProducts";

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    user_id: 0,
    username: "",
    access_id: 0,
    ticketnumber: "",
    products_registered: 0
  });

  useEffect(() => {
    API.getLoginStatus().then(res => {
      if (res.user.access_id > 0) {
        setCurrentUser(res.user);
      }
    });
  }, []);
  return (
    <Router>
      <div>
        <Container>
          <Switch>
            <Route
              strict
              exact
              path="/"
              render={props => (
                <Login {...props} setUser={setCurrentUser} user={currentUser} />
              )}
            />
            <Route
              strict
              exact
              path="/register"
              render={props => <Register {...props} setUser={setCurrentUser} />}
            />
            <Route
              strict
              exact
              path="/products"
              render={props => (
                <Products
                  {...props}
                  user={currentUser}
                  setUser={setCurrentUser}
                />
              )}
            />
            <Route
              strict
              exact
              path="/printlist"
              render={props => (
                <PrintList
                  {...props}
                  user={currentUser}
                  setUser={setCurrentUser}
                />
              )}
            />
            <Route strict exact path="/print" component={PrintProducts} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};
export default App;
