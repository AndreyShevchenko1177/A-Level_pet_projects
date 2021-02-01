import React, { Component, useEffect, useState, useRef } from "react";
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
            style={{ backgroundColor: `${color}` }}
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

const Timer = ({ sec = 0, startWithPause = true }) => {
    // если во время работы счетчика скрыть спойлер, то весь этот контент помрет
    // и при открытии спойлера все начнется с начала
    // чтобы побороть - думаю надо не убивать контент спойлера, а делать просто
    // display = none (так и есть, все получилось)

    const ifSecIsNan = function (sec) {
        if (isNaN(sec)) return 0;
        return sec;
    };

    const [timeLeft, setTimeLeft] = useState(ifSecIsNan(sec));
    const [pause, setPause] = useState(startWithPause);
    const clockface = useRef(null);

    useEffect(() => {
        setTimeLeft(sec);
        setPause(startWithPause);
        return () => console.log("помер");
    }, [sec, startWithPause]);

    let h, m, s;

    // интересный метод, но барахлит из-за дробных значений
    // надо будет переписать с банальным делением
    // h = timeLeft / (60 * 60);
    // m = (h - ~~h) * 60;
    // s = (m - ~~m) * 60;
    // h = Math.floor(h);
    // m = Math.floor(m);
    // s = Math.round(s);

    h = Math.floor(timeLeft / 3600);
    m = Math.floor((timeLeft - h * 60 * 60) / 60);
    s = timeLeft - h * 60 * 60 - m * 60;

    if (timeLeft === 0) {
        clockface.current && (clockface.current.style.backgroundColor = "red");
        // setTimeout(() => clockface.current.remove(), 5000);
    } else {
        clockface.current &&
            (clockface.current.style.backgroundColor = "white");
    }

    const decTime = () => {
        if (!pause && timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
        }
    };

    setTimeout(decTime, 1000);

    return (
        <>
            {/* prettier-ignore */}
            <span ref = {clockface} style={{ border: "2px solid gray" }}>
                {`--- ${h}:${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)} ---`}
            </span>
            <button onClick={() => setPause(!pause)}>
                {(pause && "Continue") || "Pause"}
            </button>
        </>
    );
};

const TimerControl = () => {
    const [totalSec, setTotalSec] = useState(0);
    const [mySwitch, setMySwitch] = useState(false);
    const input_H_ref = useRef(null);
    const input_M_ref = useRef(null);
    const input_S_ref = useRef(null);
    const interimSec = useRef(0);

    const countTotalSec = function () {
        let total =
            (input_H_ref.current.value * 3600 || 0) +
            (input_M_ref.current.value * 60 || 0) +
            (parseInt(input_S_ref.current.value, 10) || 0);
        interimSec.current = total;
    };

    return (
        <>
            <input
                ref={input_H_ref}
                onInput={countTotalSec}
                placeholder="hh"
                type="number"
                min="0"
            />
            <input
                ref={input_M_ref}
                onInput={countTotalSec}
                placeholder="mm"
                type="number"
                min="0"
                max="59"
            />
            <input
                ref={input_S_ref}
                onInput={countTotalSec}
                placeholder="ss"
                type="number"
                min="0"
                max="59"
            />
            <button
                onClick={() => {
                    setTotalSec(interimSec.current);
                    setMySwitch(!mySwitch);
                }}
            >
                Start
            </button>

            {!mySwitch && <Timer sec={totalSec} startWithPause={false} />}
            {mySwitch && <Timer sec={totalSec} startWithPause={false} />}
        </>
    );
};

const SecondsTimer = ({ seconds }) => <h2>{seconds}</h2>;

const TimerContainer = ({ seconds = 1800, refresh = 100, render: Render }) => {
    const [startMoment, setStartMoment] = useState(0);
    const [timeLeft, setTimeLeft] = useState(seconds);
    const intervalId = useRef(null);
    const count = useRef(1);

    console.log(timeLeft);

    const checkTime = () => {
        console.log("checkTime");
        if (count.current <= timeLeft) {
            if (
                performance.now() / 1000 - startMoment / 1000 >=
                count.current
            ) {
                count.current++;
                setTimeLeft((prev) => prev - 1);
                // почему setTimeLeft(timer - 1) не срабатывает???
                // console.log("!!!", timeLeft, count.current); //????????????????????
            }
        } else {
            clearInterval(intervalId.current);
        }
    };

    useEffect(() => {
        setStartMoment(performance.now());
        intervalId.current = setInterval(checkTime, refresh);
    }, []);

    return (
        <>
            <Render seconds={timeLeft} />
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
            <Spoiler header="Timer" open={false}>
                Напишите компонент, в который передается через props количество
                секунд, а компонент при этом реализует обратный отсчет раз в
                секунду уменьшая количество секунд на 1. Останавливается на 0.
                Добавьте в компонент кнопку паузы. <p />
                Компонент должен отображать часы, минуты и секунды.
                <br />
                <br />
                <Timer sec={65} />
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <Spoiler header="TimerControl" open={false}>
                Напишите компонент, с тремя полями ввода (часы, минуты и
                секунды) и кнопкой Start, по которой будет стартовать компонент
                Timer
                <br />
                <br />
                <TimerControl />
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <Spoiler header="TimerContainer" open={true}>
                {`const SecondsTimer = ({seconds}) => <h2>{seconds}</h2>`}
                <br />
                <br />
                SecondsTimer в данном случае играет роль presentation
                компонента, который сам ничего не умеет делать, а просто
                является шаблоном для отображения своих props в удобном для
                пользователя виде. Реализуйте контейнерный компонент, который
                будет обеспечивать состояние и логику для любого таймера:
                <br />
                <br />
                {`<TimerContainer seconds={1800} refresh={100} render={SecondsTimer} />`}
                <br />
                <br />
                TimerContainer должен:
                <ul>
                    <li>
                        воспринимать три пропса:
                        <ul>
                            <li>seconds - секунды для обратного отсчета</li>
                            <li>
                                {" "}
                                refresh - периодичность обновления таймера в
                                миллисекундах
                            </li>
                            <li>
                                render - компонент для отрисовки, которому
                                передается текущее время
                            </li>
                        </ul>
                    </li>
                    <li>
                        Время вычисляется не по количеству обновлений, а по
                        разности между стартовым и текущим моментом. Иначе
                        таймер будет очень неточен
                    </li>
                    <li>
                        так как JSX понимает переменные с маленькой буквы не как
                        компоненты-функции, а как тэги HTML, переприсвойте props
                        render в переменную с большой буквы и используйте её в
                        JSX, как имя компонента, передавая пропс seconds.
                    </li>
                </ul>
                <br />
                <br />
                <TimerContainer
                    seconds={10}
                    refresh={100}
                    render={SecondsTimer}
                />
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

//
//

export default App;
