import React, { Component, useState } from "react";
import "./App.css";

const ButtonCounter = ({ KOGOMALUVATY }) => {
    const [counter, setCounter] = useState(0);

    return (
        <button onClick={() => setCounter(counter + 1)}> +1({counter})</button>
    );
};

const LoginForm = ({ onLogin = null, startLog = "John", startPas = "Doe" }) => {
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

const Spoiler = ({ header = "--no header--", open, children }) => {
    const [show, setShow] = useState(open);

    return (
        <div Style="border: 2px solid green">
            <h1
                Style="cursor: pointer"
                onClick={() => {
                    console.log("Был до - ", show); /// ?????????
                    setShow(!show);
                    console.log("Стал после - ", show); /// ?????????
                }}
            >
                {header}
                <span Style="font-size: .5em">{` ({shou}===${show})`}</span>
            </h1>
            {show && <div Style="border: 2px solid red">{children}</div>}
        </div>
    );
};

const RangeInput = ({
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
            Style={"background-color: " + color}
            placeholder={`от ${inputState.min} до ${inputState.max} символов`}
            value={inputState.value}
            onChange={(e) => {
                setinputState({ ...inputState, ...{ value: e.target.value } });
            }}
        ></input>
    );
};

const PasswordConfirm = ({ min = 1, onLogin }) => {
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

    let color1 =
        pass1.length < min || !regexp.test(pass1) ? "pink" : "lightgreen";
    let color2 = pass2.length < min || pass1 !== pass2 ? "pink" : "lightgreen";

    return (
        <>
            <input
                Style={"background-color:" + color1}
                type="password"
                placeholder={`min = ${min}`}
                onChange={(e) => {
                    setPass1(e.target.value);
                }}
            ></input>
            <input
                Style={"background-color:" + color2}
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

const Timer = ({ sec = 0 }) => {
    if (isNaN(sec)) {
        sec = 0;
    }
    const [timeLeft, setTimeLeft] = useState(sec);
    const [pause, setPause] = useState(true);

    let h, m, s;

    //FIXME:
    // интересный метод, но барахлит из-за дробных значений
    // надо будет переписать с банальным %
    // хотя последний вариант floor-floor-round вроде норм
    h = timeLeft / (60 * 60);
    m = (h - ~~h) * 60;
    s = (m - ~~m) * 60;
    h = Math.floor(h);
    m = Math.floor(m);
    s = Math.round(s);

    const decTime = () => {
        if (!pause && timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
        }
    };

    setTimeout(decTime, 1000);

    return (
        <>
            {/* prettier-ignore */}
            <span Style={"border: 2px solid gray"}>
                {`--- ${h}:${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)} ---`}
            </span>
            <button onClick={() => setPause(!pause)}>
                {(pause && "Go") || "Stop"}
            </button>
        </>
    );
};

//

//

//

//

//
const App = () => {
    return (
        <>
            <Spoiler header="Spoiler-заголовок" open={false}>
                Реализуйте компонент Spoiler, скрывающий контент и открывающий
                его по клику. Компонент будет получать 3 пропс:
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <Spoiler header="RangeInput" open={false}>
                Реализовать компонент RangeInput, отображающий обычный{" "}
                <b>{`<input />`}</b> со следующими возможностями:
                <ul>
                    <li>
                        prop min - минимальная длина строки в инпуте, если
                        меньше - инпут становится красным{" "}
                    </li>
                    <li>
                        prop max - максимальная длина строки в инпуте, если
                        большe - инпут становится красным (лучше зеленым)))){" "}
                    </li>
                    <li>
                        Используйте компонент-класс и setState для отслеживания
                        и валидации длины инпута. Или useState`
                    </li>
                </ul>
                <br />
                <RangeInput
                    min={3}
                    max={6}
                    minColor="pink"
                    maxColor="lightgreen"
                ></RangeInput>
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <Spoiler header="PasswordConfirm" open={false}>
                Реализовать компонент PasswordConfirm, отображающий два{" "}
                <b>{`<input type="password" />`}</b> со следующими
                возможностями:
                <ul>
                    <li>prop min - минимальная длина пароля</li>
                    <li>
                        Используйте компонент-класс и setState для отслеживания
                        и валидации совпадения паролей и проверки на длину.Или
                        useState
                    </li>
                    <li>
                        По желанию добавьте более хитрые валидации типа проверки
                        на размеры буков и наличие цифр в пароле.
                    </li>
                </ul>
                <br />
                <p>
                    Делаю так:
                    <ul>
                        <li>
                            первый пароль должен быть боьше min значения а
                            второй пароль - боьше min значения и равен первому
                        </li>
                        <li>должна быть хотябы одна цифра</li>
                        <li>
                            должна быть хотябы одна <i>ПРОПИСНАЯ</i> латинская
                            буква
                        </li>
                        <li>
                            должна быть хотябы одна <i>строчная</i> латинская
                            буква
                        </li>
                    </ul>
                </p>
                <br />
                {/* prettier-ignore */}
                <PasswordConfirm
                    min={3}
                    onLogin={(p1, p2) =>console.log(`pass1: ${p1}, pass2: ${p2} `)}
                />
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <Spoiler header="Timer" open={true}>
                Напишите компонент, в который передается через props количество
                секунд, а компонент при этом реализует обратный отсчет раз в
                секунду уменьшая количество секунд на 1. Останавливается на 0.
                Добавьте в компонент кнопку паузы. <p />
                Компонент должен отображать часы, минуты и секунды.
                <br />
                <br />
                {/* prettier-ignore */}
                <Timer sec={7205} />
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <div className="App">
                <LoginForm
                    onLogin={(l, p) => console.log(l, p)}
                    startLog="KOlya"
                    startPas="PUpkin"
                ></LoginForm>
                <ButtonCounter />
            </div>
            <br />
            <br />
        </>
    );
};

//

export default App;
