import React, { useState, useEffect, useRef } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useLoadScript} from '@react-google-maps/api';
import NavBar from "./components/NavBar";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SearchPage from './components/SearhPage';
import HomePage from './components/HomePage';
import PostingForm from './components/PostingForm';
import PostingPage from './components/PostingPage';
import { authenticate } from "./store/session";


const places = ['places']

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  const [api, setApi] = useState('')
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/keys/googlemap')
      const {apiKey} = await res.json() 
      setApi(apiKey)
    }
    fetchData()
  },[])
  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : api,
    libraries : places
  })

  const mapRef = useRef();

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
        <NavBar isLoaded={isLoaded}/>
        </div>
        <div className='main-content'>
          <Switch>
            <Route path="/users" exact={true} >
              <UsersList/>
            </Route>
            <Route path="/users/:userId" exact={true} >
              <User />
            </Route>
            <Route path="/" exact={true}>
              <HomePage/>
            </Route>
            <Route path='/postings/form' exact={true}>
              <PostingForm/>
            </Route>
            <Route path='/postings/:id' exact={true}>
              <PostingPage/>
            </Route>
            <Route path='/postings/search/:lat/:lng'>
              <SearchPage isLoaded={isLoaded} loadError={loadError} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
