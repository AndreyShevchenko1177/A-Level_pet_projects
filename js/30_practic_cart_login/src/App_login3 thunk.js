import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
import "./App.scss";
import jwt_decode from "jwt-decode";

function authReducer(state, action) {
    if (state === undefined) {
        if (!localStorage.authToken) {
            return {};
        } else {
            action.type = "LOGIN";
            action.jwt = localStorage.authToken;
        }
    }

    if (action.type === "LOGIN") {
        try {
            localStorage.authToken = action.jwt;
            console.log("ЛОГИН", jwt_decode(action.jwt).sub.login);
            return { login: true, token: action.jwt, payload: jwt_decode(action.jwt).sub.login };
        } catch (error) {
            localStorage.removeItem("authToken");
            return {};
        }
    }

    if (action.type === "LOGOUT") {
        console.log("ЛОГАУТ");
        localStorage.removeItem("authToken");
        return {};
    }
    return state;
}

function promiseReducer(state = {}, action) {
    if (["LOGOUT", "LOGIN"].includes(action.type)) return {};
    if (action.type === "PROMISE") {
        const { name = "default", status, payload, error } = action;
        if (status) {
            return {
                ...state,
                [name]: {
                    status,
                    payload: (status === "PENDING" && state[name] && state[name].payload) || payload,
                    error,
                },
            };
        }
    }
    return state;
}

const actionAuthLogin = (jwt) => ({ type: "LOGIN", jwt });

const actionAuthLogout = () => ({ type: "LOGOUT" });

export const actionPromise = (name, promise) => {
    const actionPending = () => ({ type: "PROMISE", name, status: "PENDING", payload: null, error: null });
    const actionResolved = (payload) => ({ type: "PROMISE", name, status: "RESOLVED", payload, error: null });
    const actionRejected = (error) => ({ type: "PROMISE", name, status: "REJECTED", payload: null, error });

    return async (dispatch) => {
        dispatch(actionPending());
        let payload;
        try {
            payload = await promise;
            dispatch(actionResolved(payload));
        } catch (e) {
            dispatch(actionRejected(e));
        }
        return payload;
    };
};

const store = createStore(combineReducers({ promise: promiseReducer, auth: authReducer }), applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

//

//

//

//

//

const getGQL = (url) => (query, variables = {}) => {
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(localStorage.authToken ? { Authorization: `Bearer ${localStorage.authToken}` } : {}),
        },
        body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());
};

const gql = getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql");

const actionLogin = (login, password) => async (dispatch) => {
    let loginData = await dispatch(
        actionPromise(
            "login",
            gql(
                `query login($login:String, $password:String){
              login(login:$login,password:$password)
            }`,
                { login, password }
            )
        )
    );

    if (loginData && loginData.data.login) {
        dispatch(actionAuthLogin(loginData.data.login));
    }
};

//console.log(store.getState())

//  store.dispatch(actionLogin('tst123','123123'))
//  actionLogin('tst123','123123')(store.dispatch)

const ButtonLogout = ({ onLogout, isLoggedIn }) => (
    <button onClick={onLogout} disabled={!isLoggedIn}>
        Logout
    </button>
);

const CButtonLogout = connect((s) => ({ isLoggedIn: s.auth.login }), { onLogout: actionAuthLogout })(ButtonLogout);

const PasswordConfirm = ({ onLogin = null, isLoggedIn }) => {
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    return (
        <>
            <input
                type="text"
                onChange={(e) => {
                    setPass1(e.target.value);
                }}
            ></input>
            <input
                type="text"
                onChange={(e) => {
                    setPass2(e.target.value);
                }}
            ></input>
            <button onClick={() => onLogin(pass1, pass2)} disabled={isLoggedIn}>
                Login
            </button>
        </>
    );
};

const CPasswordConfirm = connect((s) => ({ isLoggedIn: s.auth.login }), { onLogin: actionLogin })(PasswordConfirm);

const LoginTablo = ({ loginName }) => <div>{`Your loginname: ${loginName || ""}`}</div>;
const CLoginTablo = connect((s) => ({ loginName: s.auth.payload }), null)(LoginTablo);

const App = () => (
    <div>
        <Provider store={store}>
            <CLoginTablo />
            <CButtonLogout />
            <CPasswordConfirm />
        </Provider>
    </div>
);

export default App;
