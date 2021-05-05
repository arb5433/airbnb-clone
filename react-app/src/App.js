import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Testing from './components/Testing';
import HomePage from './components/HomePage';
import { authenticate } from "./store/session";

function App() {
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
            <Route path='/test'>
              <Testing/>
            </Route>
            <Route path="/users" exact={true} >
              <UsersList/>
            </Route>
            <Route path="/users/:userId" exact={true} >
              <User />
            </Route>
            <Route path="/" exact={true}>
              <HomePage/>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
