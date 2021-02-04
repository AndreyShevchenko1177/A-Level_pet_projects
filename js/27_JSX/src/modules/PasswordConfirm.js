import React, { Component, useEffect, useState, useRef } from "react";

export const RangeInput = ({
    min = 1,
    max = 256,
    minColor = "lightgrey",
    maxColor = "lightgrey",
}) => {
    // для эксперимента помещу все параметры в стейт (хук), хоть в этом и нет необходимости
    const [inputState, setinputState] = useState({
        min,
        max,
        minColor,
        maxColor,
        value: "",
    });

    // console.log("inputState", inputState);
    let color = "";
    if (inputState.value.length < inputState.min) {
        color = inputState.minColor;
    } else if (inputState.value.length > inputState.max) {
        color = inputState.maxColor;
    } else {
        color = "";
    }

    return (
        <input
            style={{ backgroundColor: `${color}` }}
            placeholder={`от ${inputState.min} до ${inputState.max} символов`}
            value={inputState.value}
            onChange={(e) => {
                setinputState({ ...inputState, ...{ value: e.target.value } });
            }}
        ></input>
    );
};

export const PasswordConfirm = ({ min = 1, onLogin }) => {
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    // let regexp = /\d/; //  - хотя бы одна цифра
    // let regexp = /[A-Z]/; //  - хотя бы одна ЗАГЛАВНАЯ буква латинского алфавита

    let regexp = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*/;

    // (?=^.{6,}$) - Строкa > 5 символов
    // (?=.*[0-9]) - содержит цифру
    // (?=.*[A-Z]) - содержит прописную букву
    // (?=.*[a-z]) - содержит строчную букву
    // (?=.*[^A-Za-z0-9]) - символ не является буквенно-цифровым.

    // "Как только программист решает, что сможет решить проблему при помощи regexp,
    // с этого момента у него уже 2 проблемы." ©

    let color1 =
        pass1.length < min || !regexp.test(pass1) ? "pink" : "lightgreen";
    let color2 = pass2.length < min || pass1 !== pass2 ? "pink" : "lightgreen";

    return (
        <>
            <input
                style={{ backgroundColor: color1 }}
                type="password"
                placeholder={`min = ${min}`}
                onChange={(e) => {
                    setPass1(e.target.value);
                }}
            ></input>
            <input
                style={{ backgroundColor: color2 }}
                type="password"
                placeholder={`min = ${min}`}
                onChange={(e) => {
                    setPass2(e.target.value);
                }}
            ></input>
            <button
                disabled={color1 === "pink" || color2 === "pink"}
                onClick={() => onLogin(pass1, pass2)}
            >
                Confirm
            </button>
        </>
    );
};
