import React, { Component, useState } from "react";
import "./App.css";

const Input = () => {
    const [value, setValue] = useState("try");
    return (
        <>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <h1> {value.toUpperCase()}</h1>
        </>
    );
};

const Spoiler = ({ children, header: Header }) => {
    const [show, setShow] = useState(true);
    return (
        <>
            <Header onClick={() => setShow(!show)} />
            {show && children}
            {true}
        </>
    );
};

const App = () => {
    return (
        <>
            <Spoiler header={({ ...props }) => <h2 {...props}>Show</h2>}>
                <Input />
                <Input />
                <Spoiler
                    header={({ onClick }) => (
                        <button onClick={onClick}>Show</button>
                    )}
                >
                    <Input />
                    <Input />
                </Spoiler>
            </Spoiler>
        </>
    );
};

export default App;
