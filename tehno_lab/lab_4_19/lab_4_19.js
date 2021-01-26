const startX = 20;
const startY = 440;
let direction = true; // направление движения true - в сторону увеличения координаты
const delay = 0; // >=0, задержка мсек перед просчетоп следующей координаты
const step = 2; // >0, шаг просчета координат: 1 - каждый пиксель, 2 - каждый второй...
const amplitude = 10; // множитель амплитуды колебаний
const tail = 2500; // длина хвоста "для красоты"

let myCheckbox = document.getElementById("myCheckbox");

myCheckbox.style.left = startX.toString() + "px";
myCheckbox.style.top = startY.toString() + "px";

myCheckbox.onmousemove = (e) => {
    e.preventDefault(); // отмена стандартного дествия браузера
    myCheckbox.checked = !myCheckbox.checked;
};

myCheckbox.onclick = (e) => {
    e.preventDefault(); // отмена стандартного дествия браузера
};

myCheckbox.ondblclick = (e) => {
    e.preventDefault(); // отмена стандартного дествия браузера
    moveChbox(myCheckbox);
};

const moveChbox = function (element) {
    let positionX = +element.style.left.slice(0, -2);

    function f(x) {
        // поскольку корня квадратного из отрицательного числа не существует
        // в качестве аргумента возьмем модуль х
        return amplitude * Math.pow(Math.abs(x), 0.5) - 50;
    }

    // для красоты - рисует точки прохождения на экране
    function putPoint(x, y) {
        let div = document.createElement("div");
        div.classList.add("point");
        div.style.top = y;
        div.style.left = x;
        document.body.append(div);
        setTimeout(() => div.remove(), ((delay + 1) * tail) / step);
    }

    if (
        positionX < 0 ||
        positionX + element.offsetHeight + element.clientTop >
            document.documentElement.clientWidth
    ) {
        direction = !direction;
    }

    positionX += direction ? step : -step;

    element.style.left = positionX + "px";
    element.style.top = `${-f(positionX - startX) + startY - 50}` + "px";
    // -50 - компенсация начального скачка функции f()

    // для красоты - рисует точки прохождения на экране
    putPoint(element.style.left, element.style.top);

    setTimeout(() => moveChbox(element), delay);
};
