import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SearchPage from './components/SearhPage';
import HomePage from './components/HomePage';
import Map from './components/GoogleMap';
import PostingForm from './components/PostingForm';
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
              <Map/>
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
            <Route path='/postings/form'>
              <PostingForm/>
            </Route>
            <Route path='/postings/search/:lat/:lng'>
              <SearchPage/>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
