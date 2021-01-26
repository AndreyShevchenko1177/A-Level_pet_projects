const startX = 300;
const startY = 400;
let direction = false; // направление движения true - в сторону увеличения координаты
const delay = 0; // >=0, задержка мсек перед просчетоп следующей координаты
const step = 1; // >0, шаг просчета координат: 1 - каждый пиксель, 2 - каждый второй...
const amplitude = 3; // множитель амплитуды колебаний
let maxImpact = 2; // количество касаний границы браузера (если < 0, то "бесконечно" - 9007199254740991 раз)
const tail = 2500; // длина хвоста "для красоты"

let myImg = document.getElementById("myImg");

myImg.style.left = startX.toString() + "px";
myImg.style.top = startY.toString() + "px";

myImg.onclick = () => {
    myImg.style.backgroundColor = "lightskyblue";
    myImg.style.border = "3px solid green";
};

myImg.oncontextmenu = (e) => {
    e.preventDefault(); // отмена стандартного дествия браузера
    myImg.style.border = "3px solid red";
    moveAlongY(myImg);
};

const moveAlongY = function (element) {
    if (maxImpact) {
        let positionY = +element.style.top.slice(0, -2);

        function f(x) {
            return 25 * Math.cos((x * Math.PI) / 180);
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
            positionY < 0 ||
            positionY + element.offsetHeight + element.clientTop >
                document.documentElement.clientHeight
        ) {
            direction = !direction;
            maxImpact--;
        }

        element.style.left =
            `${amplitude * (f(positionY - startY) - 25) + startX}` + "px";
        // '(- amplitude * 25)' - компенсация начального скачка f(x)

        positionY += direction ? step : -step;
        element.style.top = positionY + "px";

        // для красоты - рисует точки прохождения на экране
        putPoint(element.style.left, element.style.top);

        setTimeout(() => moveAlongY(element), delay);
    }
};
