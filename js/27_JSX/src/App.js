import "./App.css";

import { Spoiler, ButtonCounter, LoginForm } from "./modules/Spoiler";
import { RangeInput, PasswordConfirm } from "./modules/PasswordConfirm";
import { Timer } from "./modules/Timer";
import { TimerControl } from "./modules/TimerControl";
import { TimerContainer } from "./modules/TimerContainer";
import { TimerPresentation, WatchPresentation } from "./modules/Presentation";

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

export default App;
