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
import NoMatch from "./pages/NoMatch";
import "./App.css";
import Products from "./pages/Products";
import API from "./utils/API";

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
              render={props => <Login {...props} setUser={setCurrentUser} />}
            />
            <Route strict exact path="/register" component={Register} />
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
            <Route component={NoMatch} />
          </Switch>
          {currentUser.access_id > 0 ? <Redirect to="/products" /> : null}
        </Container>
      </div>
    </Router>
  );
};
export default App;
