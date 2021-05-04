import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Testing from './components/Testing';
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className='app-container'>
        <div className='nav'>
        <NavBar />
        </div>
        <div className='main-content'>
          <Switch>
            <Route path="/login" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/sign-up" exact={true}>
              <SignUpForm />
            </Route>
            <Route path='/test'>
              <Testing/>
            </Route>
            <ProtectedRoute path="/users" exact={true} >
              <UsersList/>
            </ProtectedRoute>
            <ProtectedRoute path="/users/:userId" exact={true} >
              <User />
            </ProtectedRoute>
            <ProtectedRoute path="/" exact={true}>
              <h1>My Home Page</h1>
            </ProtectedRoute>
          </Switch>
        </div>
        <div className='footer'>
          <a className='dev-name' href='https://github.com/arb5433/airbnb-clone/wiki'>My Wiki</a>
          <div className='dev-name'>Created By: Adam Bailey</div>
          <a className='dev-name' href='https://github.com/arb5433'>Github Profile</a>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
