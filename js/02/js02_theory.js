
// Сформируйте объект с массивами и массив с объектами с осмысленными данными.

let firstClassPassengers = ["fio_1", "fio_2", "fio_3", "fio_4", "fio_5"];
let businessClassPassengers = ["fio_6", "fio_7", "fio_8", "", "fio_9"];
let economClassPassengers = ["fio_10", "fio_11", "fio_12", "fio_13", "fio_14"];


let plainKhakovRio = {
    dateOfFly: '2020-11-08',
    firstClass: firstClassPassengers,
    businessClass: businessClassPassengers,
    economClass: economClassPassengers
}


var age = +prompt("Сколько вам лет?", "");

if ((age <= 18) && (age >= 0)) { alert("школьник или еще меньше"); }
else {
    if (age > 18 && age < 30) { alert("молодежь") }
    else {
        if (age > 30 && age < 45) { alert("зрелость"); }
        else {
            if (age > 45 && age < 60) { alert("закат"); }
            else {
                if (age > 60) { alert("как пенсия?"); }
                else {
                    if (age < 0) { alert("похоже вы еще не родились :))"); }
                    else { alert("то ли киборг, то ли ошибка"); }
                }
            }
        }
    }
}

var color = prompt("Введите цвет", "");
switch (color) {
    case "red": document.write("<div style='background-color: red;'>красный</div>");
        break;
    case "black": document.write("<div style='background-color: black; color: white;'>черный</div>");
        break;
    case "blue": document.write("<div style='background-color: blue;'>синий</div>");
        break;
    case "green": document.write("<div style='background-color: green;'>зеленый</div>");
        break;
    default: document.write("<div style='background-color: gray;'>Я не понял</div>");
}


if (color == "red") { document.write("<div style='background-color: red;'>красный</div>"); }
else {
    if (color == "black") { document.write("<div style='background-color: black; color: white;'>черный</div>") }
    else {
        if (color == "blue") { document.write("<div style='background-color: blue;'>синий</div>") }
        else {
            if (color == "green") { document.write("<div style='background-color: green;'>зеленый</div>"); }
            else { document.write("<div style='background-color: gray;'>Я не понял</div>"); }
        }
    }
}


// Исследуйте код, найдите выражения в нём.
// Расставьте скобки так, что бы код не изменил своего поведения(работал так же как и сейчас).
// Объясните как и в каком порядке вычисляются выражения и подвыражения.

var a = 5;
var b, c;
b = (a * 5);
b = (c = (b / 2)); //порядок вычислений: b/2, этот результат заносится в переменную "c", значение "с" заносится в "b"
// ===============================================

// semicolon: error
// Сделайте несколько примеров кода, отсутствие; в которых приводит к синтаксической ошибке

//https://habr.com/ru/post/111563/

var a = 5; b = "asdf"
// ================================================


// semicolon: mistake
// Сделайте несколько примеров кода, наличиe или отсутствие; в которых приводит
// к логической ошибке
//     (т.е.код выполняется без синтаксических ошибок, но делает не то, что задумано)

b = "5";
a = 2;
a = 2 + +b;      // a = 2; + +b;

for (node = getNode();
    node.parent;
    node = node.parent);
// ================================================


//     Number: age
// С помощью prompt спросить у пользователя его возраст
// и подсчитать год рождения.Год рождения вывести с помощью alert.

alert(`Вы родились в ${new Date().getFullYear() - +(prompt("Сколько лет вам исполняется в этом году?"))} году`);
// ================================================


// Number: odd
// С помощью prompt узнайте число, введенное пользователем.
// С помощью if проверьте что число корректно преобразовано из строки.
// В случае ошибки выведите сообщение Выведите четное число или нет, используя if.
var a = prompt("Input a number:");
if (+a || +a == 0) {
    if ((a % 2) == 0) { alert("Even") }
    else { alert("Odd") }
}
else alert("Not a number");
// ================================================

// Boolean: if
// если вы спрашиваете пол пользователя с помощью confirm,
//     то по условию сделайте alert("Вы женщина") и alert("Вы мужчина")

(confirm("Вы мужчина?")) ? alert("Man") : alert("Women");
// ================================================


// Array: booleans
// Создайте массив с переменными из заданий Boolean и Boolean if.

var a = [
    confirm("Вы мужчина?"),
    confirm("Вам больше 18 лет?"),
    confirm("Вы всостоите в браке?"),
    confirm("У вас есть дети?")
];                                             //(4) [true, true, true, true]
// ================================================


// Object: real
// Найдите те или иные реальные объекты и найдите их свойства.
// Например у маркера это цвет, толщина, уровень зарядки(количество краски)
// Создайте объекты с помощью { }.
// В качестве образца посмотрите объект персоны из материала предыдущего занятия


var myExCar = {
    name: "VAZ",
    model: "2104",
    emission: 1992,
    color: "red",
    status: "Valid",
    getAge: function () { return (new Date().getFullYear() - this.emission) }
}

// Поменяйте значения свойств в ваших объектах, используя[] и.и присвоения.

myExCar.status = "Sold";
myExCar.dateOfSold = 2020;
Alert(myExCar.getAge());               //28 лет
// ================================================



var color = prompt("Введите цвет", "");
switch (color) {
    case "red": document.write("<div style='background-color: red;'>красный</div>");
    case "black": document.write("<div style='background-color: black; color: white;'>черный</div>");
        break;
    case "blue": document.write("<div style='background-color: blue;'>синий</div>");
    case "green": document.write("<div style='background-color: green;'>зеленый</div>");
        break;
    default: document.write("<div style='background-color: gray;'>Я не понял</div>");
}

// Перепишите пример выше, используя if-else

let color = "1";
debugger;
while (color !== 'stop') {
    color = prompt("Введите цвет", "");
    if ((color === "black") || (color === "red")) {
        if (color === "red") { document.write("<div style='background-color: red;'>красный</div>"); }
        document.write("<div style='background-color: black; color: white;'>черный</div>");
    } else {
        if ((color === "blue") || (color === "green")) {
            if (color === "blue") { document.write("<div style='background-color: blue;'>синий</div>"); }
            document.write("<div style='background-color: green;'>зеленый</div>");

        } else { document.write("<div style='background-color: gray;'>Я не понял</div>") }
    }
}
// ================================================
