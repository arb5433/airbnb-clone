import {createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import session from './session';
import postingReducer from './posting';
import mapReducer from './map';
import infoReducer from './info';
import bookingReducer from './bookings';
import reviewsReducer from './reviews';
import filterReducer from './filters';


const rootReducer = combineReducers({
    session,
    postings: postingReducer,
    map : mapReducer,
    info : infoReducer,
    bookings : bookingReducer,
    reviews : reviewsReducer,
    filters : filterReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
