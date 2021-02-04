import React, { Component, useEffect, useState, useRef } from "react";

export const Spoiler = ({ header = "--no header--", open, children }) => {
    const [show, setShow] = useState(open);

    return (
        <div style={{ border: "2px solid green" }}>
            <h1
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setShow(!show);
                }}
            >
                {header}
                <span
                    style={{ fontSize: ".5em" }}
                >{` ({shou}===${show})`}</span>
            </h1>

            {/* {show && (
                <div style={{ border: "2px solid red" }}>
                    {children}
                    {<b>Этот контент помирает</b>}
                </div>
            )} */}

            {/* // если убивать контент (как сверху) - то счетчики помирают */}
            {/* // вместо этого будем скрывать контент (как сделано ниже) */}

            {
                <div
                    style={{
                        border: "2px solid red",
                        display: show ? "" : "none",
                    }}
                >
                    {children}
                </div>
            }
        </div>
    );
};

export const ButtonCounter = ({ KOGOMALUVATY }) => {
    const [counter, setCounter] = useState(0);

    return (
        <button onClick={() => setCounter(counter + 1)}> +1({counter})</button>
    );
};

export const LoginForm = ({
    onLogin = null,
    startLog = "John",
    startPas = "Doe",
}) => {
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
