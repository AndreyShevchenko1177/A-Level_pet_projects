const delay = (sec) => new Promise((ok) => setTimeout(() => ok(sec), sec * 1000));

async function trafficLight(domElement, { redSec = 5, yellowSec = 2, greenSec = 3 } = {}) {
    while (true) {
        domElement.children[2].style.background = "green";
        await delay(greenSec);
        domElement.children[2].style.background = "";

        domElement.children[1].style.background = "yellow";
        await delay(yellowSec);
        domElement.children[1].style.background = "";

        domElement.children[0].style.background = "red";
        await delay(redSec - 1);
        domElement.children[1].style.background = "yellow";
        await delay(1);
        domElement.children[0].style.background = "";
        domElement.children[1].style.background = "";
    }
}

trafficLight(lights3, { greenSec: 5 });

//

// domEventPromise
// Реализуйте промисифицированную функцию, которая резолвит промис по событию в DOM:
// domEventPromise(knopka, 'click').then( e => console.log('event click happens', e))
// Функция должна:
// используя addEventListener повесить свой обработчик события на DOM element событие eventName
// по событию зарезолвить промис отдав в качестве результата объект события
// убрать обработчик с DOM-элемента, используя removeEventListener

let domEventPromise = (domElement, eventName) =>
    new Promise((resolve) => {
        let res = function (e) {
            resolve(e);
            domElement.removeEventListener(eventName, res);
        };
        domElement.addEventListener(eventName, res);
    });

knopka2.onclick = () => domEventPromise(knopka, "click").then((e) => console.log("event click happens", e));

//

// PedestrianTrafficLight
// Напишите упрощенный светофор для пешеходов
// Stage 2
// Используя Promise.race, domEventPromise и кнопку в DOM сделайте пешеходный светофор с кнопкой,
// который так же переключается по времени периодически.
// Stage 3
// Не давайте возможности пешеходам сильно наглеть - предусмотрите задержку, после которой будет работать кнопка.

// lights2red.style.background = "red";

async function pedestrianTrafficLight(domElement, { redSec = 10, greenSec = 2 } = {}) {
    domElement.children[0].style.background = "";
    domElement.children[1].style.background = "green";
    await delay(greenSec);
    domElement.children[1].style.background = "";

    domElement.children[0].style.background = "red";
    await delay(redSec);
    domElement.children[0].style.background = "";
    return "semafor";
}

async function pedestrianManage(domElement) {
    debugger;

    while (true) {
        // let res = await Promise.race([domEventPromise(goButton, "click"), delay(5)]);
        let res = await Promise.race([domEventPromise(goButton, "click"), pedestrianTrafficLight(domElement)]);

        console.log(res);
    }
}

pedestrianManage(lights2);
