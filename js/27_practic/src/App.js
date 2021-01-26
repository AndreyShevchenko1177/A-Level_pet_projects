import React, { Component, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const LoginForm = ({ onLogin, startLog, startPas }) => {
    const [login, setLogin] = useState(startLog);
    const [password, setPassword] = useState(startPas);
    // console.log(login, password);

    return (
        <div className="LoginForm">
            <input
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                disabled={!login || !password}
                onClick={() => onLogin(login, password)}
            >
                Login {login && `as ${login}`}{" "}
            </button>
        </div>
    );
};

const ButtonCounter = ({ KOGOMALUVATY }) => {
    const [counter, setCounter] = useState(0);

    return (
        <button onClick={() => setCounter(counter + 1)}> +1({counter})</button>
    );
};

//
const App = () => {
    return (
        <>
            <div className="App">
                <LoginForm
                    onLogin={(l, p) => console.log(l, p)}
                    startLog="KOlya"
                    startPas="PUpkin"
                ></LoginForm>
                <ButtonCounter />
            </div>
        </>
    );
};

//

export default App;
