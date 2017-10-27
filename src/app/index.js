// import React from "react";
// import { render } from "react-dom";
//
// import { User } from "./components/User";
// import { Main } from "./components/Main";
//
// class App extends React.Component {
//
//     constructor(){
//         super();
//         this.state = {
//             username: "Max"
//         }
//     }
//
//     changeUsername(newName) {
//         this.setState({
//             username: newName
//         });
//     }
//
//
//     render(){
//
//         return (
//             <div className="container">
//                 <Main changeUsername= {this.changeUsername.bind(this)}/>
//                 <User username= {this.state.username}/>
//             </div>
//
//         );
//     }
// }
//
// render(<App/>, window.document.getElementById("app"));

import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { createLogger } from "redux-logger";

// const initialState = {
//     result: 1,
//     lastValues: [],
//     username: "Max"
//
// };

const mathReducer = (state = {
    result: 1,
    lastValues: []

}, action) => {
    switch (action.type) {

        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;

        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]

            };
            break;

    }
    return state;
};

const userReducer = (state = {
    username: "Max",
    age: 27

}, action) => {
    switch (action.type) {

        case "SET_NAME":
            state = {
                ...state,
                username: action.payload
            };
            break;

        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break;

    }
    return state;
};

const myLogger = (store) => (next) => (action) => {
  console.log("Logged Action: ", action);
  next(action);
};

const store = createStore(combineReducers({mathReducer, userReducer}), {}, applyMiddleware( createLogger()));

store.subscribe(() => {
   // console.log("Store Updated: ", store.getState());
});

store.dispatch({
    type: "ADD",
    payload: 10
});

store.dispatch({
    type: "ADD",
    payload: 25
});

store.dispatch({
    type: "ADD",
    payload: 40
});

store.dispatch({
    type: "SUBTRACT",
    payload: 7
});

store.dispatch({
    type: "SET_AGE",
    payload: 30
});

store.dispatch({
    type: "SET_NAME",
    payload: "WAL"
});



