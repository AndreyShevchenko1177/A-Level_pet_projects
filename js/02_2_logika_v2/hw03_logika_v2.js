
let taskList = (`
1 switch: sizes (размер одежды)
2 switch: if (цвета)
3 prompt: or (год рождения)
4 confirm: or this days (шопинг бяка || &&)
5 confirm: if this days  (шопинг бяка if-else)
6 triple prompt (ФИО в строку)
7 default: or (John Doe)
8 default: if (John Doe with IF)
9 login and password
10 currency calc
11 scissors (камень ножницы бумага) - черный пояс
`)

function hw03_logika_v2() {
    var task = +(prompt("Что? Новый хозяин! надо???  Введите номер задания:\n" + taskList, "Напечь за меня пирогов!").toLowerCase());
    switch (task) {
        case 1: {
            alert(`Рука не поднимается переписывать предыдущий код на "switch"`);
            let tablOfSize = {
                ru: {
                    countryName: "россия",
                    size: [40, 42, 44, 46, 48, 50, 52, 54,]
                },

                eu1: {
                    countryName: "бельгия германия нидерланды норвегия финляндия швеция",
                    size: [34, 36, 38, 40, 42, 44, 46, 48,]
                },

                eu2: {
                    countryName: "франция швейцария",
                    size: [36, 38, 40, 42, 44, 46, 48, 50,]
                },

                italy: {
                    countryName: "италия",
                    size: [38, 40, 42, 44, 46, 48, 50, 52,]
                },

                gb: {
                    countryName: "великобритания",
                    size: [8, 10, 12, 14, 16, 18, 20, 22,]
                },

                usa: {
                    countryName: "сша",
                    size: [6, 8, 10, 12, 14, 16, 18, 20,]
                },

                usa2: {
                    countryName: "сша",
                    size: ["S", "M", "", "L", "", "XL", "", "XXL",]
                },
            }

            let inputCountry;
            let inputSise;
            let targetCountry;
            let countOfSize = (-1);
            let targetSize = ""

            function ucFirst(str) {
                if (!str) return str;
                if (str === "сша") return "США";
                return str[0].toUpperCase() + str.slice(1);
            }

            while (inputCountry = (prompt("Введите название страны 1:", "Россия")).toLowerCase()) {
                inputSise = +(prompt(`Введите размер одежды в этой стране ${inputCountry}:`, "46"));
                targetCountry = (prompt("Введите название страны 2:", "Россия")).toLowerCase();


                Object.keys(tablOfSize).forEach(function (currentvalue) {
                    if ((tablOfSize[currentvalue].countryName).includes(inputCountry)) {
                        countOfSize = tablOfSize[currentvalue].size.indexOf(inputSise)
                    };
                });

                Object.keys(tablOfSize).forEach(function (currentvalue) {
                    if ((tablOfSize[currentvalue].countryName).includes(targetCountry)) {
                        targetSize += (tablOfSize[currentvalue].size[countOfSize] + ", ")
                    };
                });

                inputCountry = ucFirst(inputCountry);
                targetCountry = ucFirst(targetCountry);

                alert(`${inputCountry} - ${inputSise}\n${targetCountry} - ${targetSize.substring(0, targetSize.length - 2)}`);
                targetSize = "";
            }
        };
            break;


        case 2: {
            // var color = prompt("Введите цвет", "");
            // switch (color) {
            //     case "red": document.write("<div style='background-color: red;'>красный</div>");
            //     case "black": document.write("<div style='background-color: black; color: white;'>черный</div>");
            //         break;
            //     case "blue": document.write("<div style='background-color: blue;'>синий</div>");
            //     case "green": document.write("<div style='background-color: green;'>зеленый</div>");
            //         break;
            //     default: document.write("<div style='background-color: gray;'>Я не понял</div>");
            // }

            // Перепишите пример выше, используя if-else

            let color = "1";
            // debugger;
            while ((color !== 'stop') && (color)) {
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
            };
        };
            break;


        case 3: {
            let age = "";
            while (!(age)) {
                (age = prompt("Сколько лет вам исполнится (исполнилось) в этом году?")) || (alert("Введите возраст (число)"));
            }
            alert(`Вы родились в ${new Date().getFullYear() - +age} году, \nконечно, если дата на компьютере установлена правильно.`);
        };
            break;


        case 4: {
            ((confirm("Сегодня будет шопинг?")) || (alert("Вот ты бяка!!!"))) && (alert("COOL!!!"));
        };
            break;


        case 5: {
            if (confirm("Сегодня будет шопинг?")) { alert("COOL!!!") } else alert("Вот ты бяка!!!");
        };
            break;


        case 6: {
            function ucFirst(str) {
                if (!str) { return str; }
                else {
                    let strLast = (str.slice(1)).toLowerCase();
                    return str[0].toUpperCase() + strLast;
                }
            };


            let surname = ucFirst(prompt("Фамилия?", "Иванов"));
            let name = ucFirst(prompt("Имя?", "Иван"));
            let patronymic = ucFirst(prompt("Отчество", "Иванович"));

            alert(surname + " " + name + " " + patronymic);
        };
            break;


        case 7: {
            function ucFirst(str) {
                if (!str) { return str; }
                else {
                    let strLast = (str.slice(1)).toLowerCase();
                    return str[0].toUpperCase() + strLast;
                }
            };


            let surname = (prompt("Фамилия?", "Иванов")) || "Doe";
            let name = (prompt("Имя?", "Иван")) || "John";
            let patronymic = (prompt("Отчество", "Иванович")) || "Ivanovich";

            surname = ucFirst(surname);
            name = ucFirst(name);
            patronymic = ucFirst(patronymic);

            alert(surname + " " + name + " " + patronymic);
        };
            break;


        case 8: {

            function ucFirst(str) {
                if (!str) { return str; }
                else {
                    let strLast = (str.slice(1)).toLowerCase();
                    return str[0].toUpperCase() + strLast;
                }
            };

            let surname;
            let name;
            let patronymic;

            if (!(surname = (prompt("Фамилия?", "Иванов")))) { surname = "Doe" };
            if (!(name = (prompt("Имя?", "Иван")))) { name = "John" };
            if (!(patronymic = (prompt("Отчество", "Иванович")))) { patronymic = "Ivanovich" };

            surname = ucFirst(surname);
            name = ucFirst(name);
            patronymic = ucFirst(patronymic);

            alert(surname + " " + name + " " + patronymic);
        };
            break;


        case 9: {
            // debugger
            let correctLogin = "admin";
            let correctPass = "qwerty";
            let inputLogin = inputPass = "";


            if (inputLogin = prompt("Login?")) {
                if (inputLogin === correctLogin) {
                    if (inputPass = prompt("Password"))
                        if (inputPass === correctPass) { alert("CORRECT") }
                        else { alert("Incorrect password") }
                } else { alert("Incorrect login!") }
            };


            // Дальше тоже рабочий вариант, но не перестает спрашивать логин, пока не введем правильный логин
            // {
            //     while (!((((inputLogin = prompt("Login?")) && (inputLogin === correctLogin)) || (alert("Такого пользователя не существует.")))
            //         && ((inputPass = prompt("Password?")) || alert("Пароль надо ввести!"))));
            //     ((inputLogin === correctLogin) && (inputPass === correctPass)) &&
            //         !(alert("CORRECT !!")) || (alert("Ваш пароль не верный!"))
            // };

        };
            break;


        case 10: {
            window.open("./curensy.html", "_self");
        };
            break;


        case 11: {
            let greeting = `\nТвой вариант?\n1-камень, 2-ножницы, 3-бумага ?\n\nВведи число:\nДля завершения введи ноль "0"`
            let youChoice = "1";
            let myChoice;
            let arrVariant = ["камень", "ножницы", "бумага"];
            let result;
            // debugger;
            while (!!youChoice) {
                while (!(youChoice = +(prompt(greeting, "0"))) && (youChoice !== 0));
                if ((youChoice < 4) && (youChoice > 0)) {
                    myChoice = Math.floor(Math.random() * 3) + 1;
                    alert(`Мой вариант - ${arrVariant[myChoice - 1]}`);
                    result = (youChoice - myChoice + 3) % 3;
                    ((result === 1) && (!alert("Ты проиграл!!! LOSER!"))) ||
                        (((result === 0) && (!alert("---НИЧЬЯ---"))) ||
                            (alert("Ты выиграл, мой повелитель!")))
                }
            }
        };
            break;


        default: { alert("Такого мы еще не умеем...!!!") };
    }
}