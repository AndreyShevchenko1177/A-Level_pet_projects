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
            console.log("domEventPromise - done");
        };
        domElement.addEventListener(eventName, res);
    });

knopka2.onclick = () => domEventPromise(knopka, "click").then((e) => console.log("event click happens", e));

//

// PedestrianTrafficLight
// Напишите упрощенный светофор для пешеходов

function innerTimer(domElement, sec) {
    for (let i = sec; i > 0; i--) {
        setTimeout(() => (domElement.innerText = i), (sec - i) * 1000);
    }
    setTimeout(() => (domElement.innerText = ""), sec * 1000);
}

async function pedestrianTrafficLight(domElement, { redSec = 10, greenSec = 3 } = {}) {
    domElement.children[1].style.background = "lightgreen";
    innerTimer(domElement.children[1], greenSec);
    await delay(greenSec);
    domElement.children[1].style.background = "";

    domElement.children[0].style.background = "red";
    innerTimer(domElement.children[0], redSec);
    await delay(redSec);
    domElement.children[0].style.background = "";
}

async function pedestrianManage(domElement) {
    while (true) {
        await pedestrianTrafficLight(domElement, { redSec: 6 });
    }
}

pedestrianManage(lights2);

//

// Stage 2
// Используя Promise.race, domEventPromise и кнопку в DOM сделайте пешеходный светофор с кнопкой,
// который так же переключается по времени периодически.
// Stage 3
// Не давайте возможности пешеходам сильно наглеть - предусмотрите задержку, после которой будет работать кнопка.

//

// Логика работы светофора:
// бОльшую часть времени светофор работает для машин и изредка автоматически включается для пешеходов
// 20 сек - красный (машины едут)
// 5 сек - зеленый(идут пешеходы)
// Для особо спешащих пешеходов есть кнопка, которая позволяет ТОЛЬКО  в фазе "красный" переключиться сразу на зеленый
// После этого незапланированного "зеленого" цикла продолжит дорабатывать свое время "красный" цикл.
// но за такую спешку надо платить: 20 секнд после "зеленого" нажать на кнопку будет нельзя а новая фаза "красного"
// начнется без прерывания на зеленый (то есть пропуск "зеленой" фазы, которая должна была бы быть по расписанию)

async function pedestrianManageBtn(domElement) {
    async function redLite(redTime) {
        domElement.children[1].style.background = "";
        domElement.children[0].style.background = "red";
        innerTimer(domElement.children[0], redTime);
        await delay(redTime);
        // domElement.children[0].style.background = "";
        // domElement.children[1].style.background = "lightgreen";
        // return "red";
    }

    async function greenLite(greenTime) {
        goButton.disabled = true;
        domElement.children[0].style.background = "";
        domElement.children[1].style.background = "lightgreen";
        innerTimer(domElement.children[1], greenTime);
        await delay(greenTime);
        domElement.children[1].style.background = "";
        domElement.children[0].style.background = "red";
        if (goButton.innerText === "GO") {
            goButton.disabled = false;
        }
        // return "green";
    }

    let goButtonDelay = 20;
    let btn, red, green;
    let isGoButtonPressed;

    while (true) {
        isGoButtonPressed = false;
        btn = domEventPromise(goButton, "click");
        btn.then(() => {
            goButton.disabled = true;
            isGoButtonPressed = true;
            innerTimer(goButton, goButtonDelay);
            setTimeout(() => {
                if (domElement.children[1].style.background !== "lightgreen") goButton.disabled = false;
                goButton.innerText = "GO";
            }, goButtonDelay * 1000);
        });

        while (!isGoButtonPressed) {
            await Promise.race([btn, (red = redLite(20))]).then(() => (green = greenLite(5)));
            await Promise.all([red, green]);
            console.log("await Promise.all([red, green])");
        }
    }

    //  ниже - старый но рабочий вариант

    // while (true) {
    //     await Promise.race([(btn = domEventPromise(goButton, "click")), (red = redLite(20))]).then(() => {
    //         green = greenLite(5);
    //         btn.then(() => {
    //             innerTimer(goButton, 20);
    //             goButton.disabled = true;
    //             setTimeout(() => {
    //                 goButton.disabled = false;
    //                 goButton.innerText = "GO";
    //             }, 20000);
    //         });
    //     });

    //     await Promise.all([red, green]);
    // }
}

pedestrianManageBtn(lights2btn);
