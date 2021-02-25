import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { actionLogin, store } from "../Reduser";

// import history from "../history";
// import { store } from "../Reducers";

const LoginForm = ({ onLogin = null, isLoggedIn, mode = "Login" }) => {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [nick, setNick] = useState("");
    const input_ref = useRef(null);
    const pass_ref = useRef(null);
    const nick_ref = useRef(null);
    const btn_ref = useRef(null);

    return (
        <div className="LoginForm">
            <input
                ref={input_ref}
                readOnly={isLoggedIn}
                type="text"
                placeholder="Login"
                onChange={(e) => {
                    setLogin(e.target.value);
                }}
            ></input>
            <input
                ref={pass_ref}
                readOnly={isLoggedIn}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                    setPass(e.target.value);
                }}
            ></input>

            <button
                ref={btn_ref}
                onClick={() => {
                    onLogin(login, pass);
                    console.log("кнопка лагин нажата");
                }}
                disabled={isLoggedIn || !login || !pass || (mode !== "Login" && !nick)}
            >
                {mode}
            </button>
        </div>
    );
};

const CLoginForm = connect((s) => ({ isLoggedIn: s.auth.login, mode: "Login" }), { onLogin: actionLogin })(LoginForm);

export const Login = () => {
    return (
        <>
            <div>PageLogin</div>
            <CLoginForm />
        </>
    );
};
