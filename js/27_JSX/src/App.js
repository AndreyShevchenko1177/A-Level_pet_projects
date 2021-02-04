import React, { Component, useEffect, useState, useRef } from "react";
import "./App.css";
import clockFace from "./imgages/ClockFace.png";
import clockFaceH from "./imgages/ClockFace_H.png";
import clockFaceM from "./imgages/ClockFace_M.png";
import clockFaceS from "./imgages/ClockFace_S.png";

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
        // return () => console.log("помер");
    }, [sec, startWithPause]);

    let h, m, s;

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

const TimerControl = ({
    counter: Counter = Timer,
    // render: Render /* = WatchPresentation */,
    ...props
}) => {
    const [totalSec, setTotalSec] = useState(0);
    const input_H_ref = useRef(null);
    const input_M_ref = useRef(null);
    const input_S_ref = useRef(null);
    const [clickCount, setClickCount] = useState(0);

    const countTotalSec = function () {
        let total =
            (input_H_ref.current.value * 3600 || 0) +
            (input_M_ref.current.value * 60 || 0) +
            (parseInt(input_S_ref.current.value, 10) || 0);
        // interimSec.current = total;
        setTotalSec(total);
    };

    return (
        <>
            <input
                ref={input_H_ref}
                // onInput={countTotalSec}
                placeholder="hh"
                type="number"
                min="0"
            />
            <input
                ref={input_M_ref}
                // onInput={countTotalSec}
                placeholder="mm"
                type="number"
                min="0"
                max="59"
            />
            <input
                ref={input_S_ref}
                // onInput={countTotalSec}
                placeholder="ss"
                type="number"
                min="0"
                max="59"
            />

            <button
                onClick={() => {
                    countTotalSec();
                    setClickCount((prev) => prev + 1);
                    // setMySwitch(!mySwitch);
                }}
            >
                Start
            </button>

            {
                <Counter
                    sec={totalSec}
                    seconds={totalSec}
                    startWithPause={false}
                    clickNumber={clickCount}
                    {...props}
                    key={clickCount}
                />
            }
        </>
    );
};

const SecondsTimer = ({ seconds }) => <h2>{seconds}</h2>;

const TimerContainer = ({
    seconds = 0,
    refresh = 100,
    clickNumber = 0,
    render: Render = SecondsTimer,
}) => {
    const [startMoment, setStartMoment] = useState(performance.now());
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [clickCount, setClickCount] = useState(0);
    const count = useRef(1);
    const intervalId = useRef(null);

    // console.log(timeLeft, clickCount);

    const trackTime = () => {
        intervalId.current = setInterval(() => {
            console.log("interval");
            if (timeLeft >= count.current) {
                if ((performance.now() - startMoment) / 1000 > count.current) {
                    count.current++;
                    setTimeLeft((prev) => prev - 1);
                }
            } else clearInterval(intervalId.current);
        }, refresh);
    };

    useEffect(() => {
        clearInterval(intervalId.current);
        setClickCount(clickNumber);
        setTimeLeft(seconds);
        count.current = 1;
        setStartMoment(performance.now());
        trackTime();
        return () => clearInterval(intervalId.current);
    }, [clickNumber]);

    return (
        <>
            <Render seconds={timeLeft} />
        </>
    );
};

const TimerPresentation = ({ seconds }) => (
    <h1>
        <Timer sec={seconds} startWithPause={true} />
    </h1>
);

const WatchPresentation = ({ seconds = 0 }) => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    let sDeg = s * 6; // 360°:60сек = 6° для одной минуты и для 1 секунды
    let mDeg = (m + s / 60) * 6;
    let hDeg = (h + m / 60 + s / 3600) * 30; // 360°:12часов = 30° для одного часа

    return (
        <>
            {`${seconds} - ${h}:${m}:${s}`}
            <div className="watch">
                <img src={clockFace} alt=""></img>
                <img
                    src={clockFaceH}
                    alt=""
                    style={{ transform: `rotate(${hDeg}deg)` }}
                ></img>
                <img
                    src={clockFaceM}
                    alt=""
                    style={{ transform: `rotate(${mDeg}deg)` }}
                ></img>
                <img
                    src={clockFaceS}
                    alt=""
                    style={{ transform: `rotate(${sDeg}deg)` }}
                ></img>
            </div>
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
            <Spoiler header="TimerContainer" open={false}>
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
                <TimerContainer seconds={1800} />
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <Spoiler header="LCD" open={false}>
                Сделайте из компонента Timer presentation компонент без state,
                прикрутите его к TimerContainer
                <br />
                <br />
                <TimerContainer seconds={1800} render={TimerPresentation} />
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <Spoiler header="Watch" open={false}>
                Реализуйте часы со стрелками в качестве presentation компонента:
                <ul>
                    <li>квадратный блок-контейнер</li>
                    <li>
                        стрелки и, возможно, цифры позиционируются с помощью
                        transform: rotate(УГОЛdeg)
                    </li>
                    <li>
                        В верстке используйте position absolute для накладывания
                        блоков стрелок и цифр друг на друга (это даст общий
                        центр вращения)
                    </li>
                    <li>
                        для корректного центра вращения блок со стрелкой или
                        цифрой должен быть шириной с родительский квадратный
                        блок
                    </li>
                    <li>
                        есть еще всякий css (text-orientation) для вращения цифр
                        внутри повернутого блока
                    </li>
                </ul>
                <br />
                <br />
                <TimerContainer seconds={1800} render={WatchPresentation} />
            </Spoiler>
            <br />
            <br />

            {/*  ================================================================================= */}
            <Spoiler header="TimerControl + TimerContainer" open={false}>
                Используя TimerControl обновите его код, в котором будет
                использоваться не Timer, а новый контейнерный компонент
                <br />
                <br />
                {/* <TimerContainer seconds={1800} render={WatchPresentation} /> */}
                <TimerControl
                    counter={TimerContainer}
                    render={WatchPresentation}
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
