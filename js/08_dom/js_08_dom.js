//

var titleStyle = `background-color: lightgray;`;
var globalTableNumber = 1;

// --------------Построение таблицы с присвоением ей номера---------------

function createTable() {
    let tableNumber = globalTableNumber++;
    let di = document.createElement("div");
    di.style = "margin: 20px";
    document.body.appendChild(di);

    var myTable = document.createElement("table");
    myTable.setAttribute("id", "myTableID" + tableNumber);
    myTable.setAttribute("border", "1");
    myTable.setAttribute("align", "center");
    myTable.style = `font-weight: 700; font-family: Arial, Helvetica, sans-serif;`;

    di.appendChild(myTable);

    let multiTable = [];
    for (yAxis = 0; yAxis < 10; yAxis++) {
        multiTable[yAxis] = [];
        var trLine = document.createElement("tr");
        trLine.setAttribute("height", "25px");
        myTable.appendChild(trLine);
        if (yAxis === 0) trLine.style = titleStyle;

        for (xAxis = 0; xAxis < 10; xAxis++) {
            multiTable[yAxis][xAxis] = xAxis === 0 ? yAxis : (yAxis || 1) * xAxis;

            var tdCell = document.createElement("td");
            tdCell.setAttribute("align", "center");
            tdCell.setAttribute("width", "25px");

            let className = xAxis * yAxis === 0 ? "cellTitle" : "cell";
            className += tableNumber;
            tdCell.setAttribute("class", className);

            if (xAxis === 0) tdCell.style = titleStyle;
            trLine.appendChild(tdCell);
            tdCell.innerHTML = `${multiTable[yAxis][xAxis]}`;
        }
    }
}

// -------------- Подсветить ячейку в таблице номер №---------------

function lightCell(tableNumber = "1") {
    let cells = document.querySelectorAll(".cellTitle" + tableNumber);

    for (let node of cells) {
        node.onmousemove = function () {
            this.style.background = "limegreen";
        };
        node.onmouseout = function () {
            this.style.background = "lightgray";
        };
    }

    cells = document.querySelectorAll(".cell" + tableNumber);

    for (let node of cells) {
        node.onmousemove = function () {
            this.style.background = "skyblue";
        };
        node.onmouseout = function () {
            this.removeAttribute("style");
        };
    }
}

// --------------Подсветить строку и столбец в таблице №---------------

function lightCross(tableNumber = "1") {
    let cells = document.querySelectorAll(".cell" + tableNumber);

    for (let node of cells) {
        var cellNumber;

        node.onmousemove = function () {
            cellNumber = this.cellIndex;
            let element = this;

            // --- можно так добираться (шаг за шагом)---
            while (element.previousElementSibling) {
                element = element.previousElementSibling;
            }
            do {
                element.style.background = ~element.getAttribute("class").indexOf("cellTitle") ? "limegreen" : "peru";
                if (element.cellIndex === cellNumber) {
                    element.style.background = "pink";
                }
                element = element.nextElementSibling;
            } while (element);

            // --- а можно так ---
            element = this;
            element = element.parentElement.parentElement;
            for (let rows of element.children) {
                if (rows.rowIndex !== this.parentElement.rowIndex) {
                    rows.children[cellNumber].style.background = "peru";
                }
            }
            element.children[0].children[cellNumber].style.background = "limegreen";
        };

        node.onmouseout = function () {
            let cellNumber = this.cellIndex;
            let element = this;

            element = element.parentElement;
            for (let cells of element.children) {
                cells.style.background = "#fff";
            }
            element.children[0].style.background = "lightgray";

            element = element.parentElement;
            for (let rows of element.children) {
                rows.children[cellNumber].style.background = "#fff";
            }
            element.children[0].children[cellNumber].style.background = "lightgray";
        };
    }
}

// --------------Подсветить строку и столбец в таблице №  (версия 2)---------------

function lightCrossV2(tableNumber = "1") {
    let tableID = "myTableID" + tableNumber;
    let el = document.getElementById(tableID);
    for (let tr of el.children) {
        for (let td of tr.children) {
            td.onmousemove = function () {
                if (this.parentElement.rowIndex) {
                    td.parentElement.style.background = "peru";
                }
                for (let tr1 of el.children) {
                    if (this.cellIndex) {
                        tr1.children[this.cellIndex].style.background = "peru";
                    }
                }
                this.style.background = "pink";
                el.children[0].children[this.cellIndex].style.background = "limegreen";
                this.parentElement.children[0].style.background = "limegreen";
            };

            td.onmouseout = function () {
                if (this.parentElement.rowIndex) {
                    td.parentElement.removeAttribute("style");
                }
                for (let tr1 of el.children) {
                    if (this.cellIndex) {
                        tr1.children[this.cellIndex].removeAttribute("style");
                    } else el.children[0].children[0].style.background = "lightgray";
                }

                this.parentElement.children[0].style.background = "lightgray";
            };
        }
    }
}

// --------------Убрать любые подсветки из таблицы №---------------

function lightsOff(tableNumber = "1") {
    let tableID = "myTableID" + tableNumber;
    let el = document.getElementById(tableID);
    for (let tr of el.children) {
        tr.onmousemove = tr.onmouseout = null;
        for (let td of tr.children) {
            td.onmousemove = td.onmouseout = null;
        }
    }
}

// ---------------------- Запуск на выполнение всех задач --------------------

createTable();

let p = document.createElement("p");
p.style = "text-align: center; margin: 20px;";
document.body.appendChild(p);

let title1 = document.createElement("div");
title1.innerHTML = "Кнопки для верхней таблицы<br>";
p.appendChild(title1);

let btn1 = document.createElement("button");
btn1.innerHTML = `Подсветка Cell`;
btn1.onclick = () => {
    lightCell("1");

    btn1.setAttribute("disabled", "disabled");
    btn1.style = "color: red;";

    btn2.removeAttribute("disabled");
    btn2.style = "";

    btn3.removeAttribute("disabled");
    btn3.style = "";
};
p.appendChild(btn1);

let btn2 = document.createElement("button");
btn2.innerHTML = `Подсветка Cros.ver2`;
btn2.onclick = () => {
    lightCrossV2("1");

    btn2.setAttribute("disabled", "disabled");
    btn2.style = "color: red;";

    btn1.removeAttribute("disabled");
    btn1.style = "";

    btn3.removeAttribute("disabled");
    btn3.style = "";
};
p.appendChild(btn2);

let btn3 = document.createElement("button");
btn3.innerHTML = `Подсветка OFF`;
btn3.onclick = () => {
    lightsOff("1");

    btn3.setAttribute("disabled", "disabled");
    btn3.style = "color: red;";

    btn2.removeAttribute("disabled");
    btn2.style = "";

    btn1.removeAttribute("disabled");
    btn1.style = "";
};
p.appendChild(btn3);

btn3.onclick();

createTable();
createTable();

lightCell("2");

lightCross("3");

//------------------------Калькулятор---------------------------

let divCalc = document.createElement("div");
divCalc.style = "text-align: center; margin: 20px;";
document.body.appendChild(divCalc);

let question = document.createElement("span");
question.innerHTML = "Сколько лет Вам исполнилось или исполнится в этом году?</br>";
divCalc.appendChild(question);

let inp = document.createElement("input");
inp.setAttribute("type", "number");
inp.setAttribute("id", "inpId");
inp.setAttribute("value", "30");
divCalc.appendChild(inp);

let buttonArrea = document.createElement("div");
buttonArrea.style = "text-align: center; margin: 20px;";
divCalc.appendChild(buttonArrea);

let check = document.createElement("input");
check.setAttribute("type", "checkbox");
check.setAttribute("id", "checkId");
check.setAttribute("checked", "checked");
buttonArrea.appendChild(check);

let checkTitle = document.createElement("span");
checkTitle.innerText = " <-- живой калькулятор. Или нажми, чтобы получить результат --> ";
buttonArrea.appendChild(checkTitle);

let btnAlive = document.createElement("button");
btnAlive.setAttribute("id", "btnAliveId");
btnAlive.innerText = "Нажми";
btnAlive.style = "text-align: center;";
buttonArrea.appendChild(btnAlive);

let answerArea = document.createElement("div");
answerArea.style = "text-align: center;";
divCalc.appendChild(answerArea);

let answerTitle = document.createElement("span");
answerTitle.innerHTML = "Год Вашего рождения: ";
answerArea.appendChild(answerTitle);

let currYear = new Date().getFullYear();

let answer = document.createElement("span");
answer.setAttribute("id", "answerId");
answer.innerText = currYear - inp.value;
answerArea.appendChild(answer);

const letsCulc = function () {
    answerId.innerText = currYear - inpId.value;
};

btnAliveId.onclick = letsCulc;

const checkFunc = function () {
    if (checkId.checked) {
        btnAliveId.setAttribute("disabled", "disabled");
        inpId.oninput = letsCulc;
    } else {
        btnAliveId.removeAttribute("disabled");
        inpId.oninput = null;
    }
};

checkId.onclick = checkFunc;
checkFunc();
