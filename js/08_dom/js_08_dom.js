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
        trLine.setAttribute("height", "30px");
        myTable.appendChild(trLine);
        if (yAxis === 0) trLine.style = titleStyle;

        for (xAxis = 0; xAxis < 10; xAxis++) {
            multiTable[yAxis][xAxis] = xAxis === 0 ? yAxis : (yAxis || 1) * xAxis;

            var tdCell = document.createElement("td");
            tdCell.setAttribute("align", "center");
            tdCell.setAttribute("width", "30px");

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

function lightCell(tableNumber = "") {
    let cells = document.querySelectorAll(".cellTitle" + tableNumber);

    for (let node of cells) {
        node.onmousemove = function () {
            this.style.background = "green";
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
            this.style.background = "#fff";
        };
    }
}

// --------------Подсветить строку и столбец в таблице №---------------

function lightCross(tableNumber = "") {
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
                element.style.background = ~element.getAttribute("class").indexOf("cellTitle") ? "green" : "peru";
                if (element.cellIndex === cellNumber) {
                    element.style.background = "pink";
                }
                element = element.nextElementSibling;
            } while (element);

            // --- а можно так ---
            element = this;
            element = element.parentElement.parentElement;
            for (rows of element.children) {
                if (rows.rowIndex !== this.parentElement.rowIndex) {
                    rows.children[cellNumber].style.background = "peru";
                }
            }
            element.children[0].children[cellNumber].style.background = "green";
        };

        node.onmouseout = function () {
            cellNumber = this.cellIndex;
            let element = this;

            element = element.parentElement;
            for (cells of element.children) {
                cells.style.background = "#fff";
            }
            element.children[0].style.background = "lightgray";

            element = element.parentElement;
            for (rows of element.children) {
                rows.children[cellNumber].style.background = "#fff";
            }
            element.children[0].children[cellNumber].style.background = "lightgray";
        };
    }
}

// ---------------------- Запуск на выполнение всех задач --------------------

createTable();
createTable();
createTable();

lightCell("2");

lightCross("3");
