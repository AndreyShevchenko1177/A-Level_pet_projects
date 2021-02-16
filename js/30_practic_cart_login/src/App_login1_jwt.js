// login

import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import "./App.css";
import jwt_decode from "jwt-decode";

// const myJwtTokenConst =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MDIzZmJlYjJmYzZlOTI1ZDI3MjQ3N2QiLCJsb2dpbiI6InF3ZSIsImFjbCI6WyI2MDIzZmJlYjJmYzZlOTI1ZDI3MjQ3N2QiLCJ1c2VyIl19LCJpYXQiOjE2MTMxMDc5Njl9.qd2UFUeWrQpeXYgtKJtTnKVZE_r6kcmGp-jt9P1j03o";

function authReducer(state, action) {
    //....
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

const actionAuthLogin = (jwt) => ({ type: "LOGIN", jwt });
const actionAuthLogout = () => ({ type: "LOGOUT" });

const ButtonLogout = ({ onLogout, isLoggedIn }) => (
    <button onClick={onLogout} disabled={!isLoggedIn}>
        Logout
    </button>
);

const FormLogin = (
    { onLogin, isLoggedIn } //добавить инпут и стейт реакт с JWT
) => {
    const [inpValue, setInpValue] = useState("");
    return (
        <div>
            <textarea
                rows="10"
                cols="45"
                placeholder="input jwt-token"
                value={inpValue}
                onChange={(e) => setInpValue(e.target.value)}
            ></textarea>
            <button
                onClick={() => onLogin(inpValue)} //из useState jwt
                disabled={isLoggedIn || !inpValue}
            >
                Login
            </button>
        </div>
    );
};

const LoginTablo = ({ loginName }) => <div>{`Your loginname: ${loginName || ""}`}</div>;

const CLoginTablo = connect((s) => ({ loginName: s.payload }), null)(LoginTablo);

const CButtonLogout = connect((s) => ({ isLoggedIn: s.login }), { onLogout: actionAuthLogout })(ButtonLogout);
const CFormLogin = connect((s) => ({ isLoggedIn: s.login }), { onLogin: actionAuthLogin })(FormLogin);

const store = createStore(authReducer);

store.subscribe(() => console.log(store.getState()));

const App = () => (
    <div>
        <Provider store={store}>
            <CLoginTablo />
            <br />
            <br />
            <CFormLogin />
            <br />
            <br />
            <CButtonLogout />
        </Provider>
    </div>
);

export default App;
