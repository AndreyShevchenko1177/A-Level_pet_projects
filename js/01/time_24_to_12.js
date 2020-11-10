let time24 = "";
let time12 = "";

do {
    time24 = prompt("Введите время в 24-часовом формате через точку (Часы.Минуты):", "21.45"); // Ввод времени в 24-часовом формате
    do {
        if (!(+(time24)) && (time24 != null) && (time24 != 0)) time24 = prompt("Введите число!!!\nВведите время в 24-часовом формате через точку (Часы.Минуты):", "21.45")
        else
            if ((time24 < 0 || time24 >= 24) && !!time24)
                time24 = prompt("Время не может быть меньше 00.00 и больше 23.59!\nВведите время в 24-часовом формате через точку (Часы.Минуты):", "21.45")
            else
                if ((time24 - Math.trunc(time24)) > 0.59)
                    time24 = prompt("Минут не может быть больше 59!\nВведите время в 24-часовом формате через точку (Часы.Минуты):", "21.45")
    } while (((!(+time24) && (time24 != null) && (time24 != 0)) || ((time24 < 0 || time24 >= 24) && !!time24) || ((time24 - Math.trunc(time24)) > 0.59)));

    if (time24 >= 13) { time12 = time24 - 12 } else { time12 = time24 };
    if (time12) {
        time12 = +time12;
        alert(`Вы ввели время: ` + time24 + `.\nВремя в 12-часовом формате: ` + time12.toFixed(2) + " !!!")
    }
} while (time24);


let firstClassPassengers = ["fio_1", "fio_2", "fio_3", "fio_4", "fio_5"];
let businessClassPassengers = ["fio_6", "fio_7", "fio_8", "", "fio_9"];
let economClassPassengers = ["fio_10", "fio_11", "fio_12", "fio_13", "fio_14"];


let plainKhakovRio = {
    dateOfFly: "202-11-08",
    firstClass: firstClassPassengers,
    businessClass: businessClassPassengers,
    economClass: economClassPassengers
}


var age = +prompt("Сколько вам лет?", "");

if ((age < 18) && (age >= 0)) { alert("школьник"); }
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


