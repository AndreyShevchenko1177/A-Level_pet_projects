let taskList = (`
1 3-persons
2 different fields
3 fields check
4 array of persons
5 loop of persons
6 loop of name and surname
7 loop of loop of values
8 fullName
9 serialize - JSON-строку из persons
10 deserialize
11 HTML
12 HTML optional fields
13 HTML tr color
14 HTML th optional = 13
15 Задание на синий пояс. HTML-конструктор
16 destruct array
17 destruct string
18 destruct 2
19 destruct 3
20 черный пояс - ассоциативная гадалка
`)

let a = {};
let b = {};
let c = {};
let myObjArr = [a, b, c];
mustHaveKeys = ["name", "surname"];

function normaliseAllObjects() {
    for (i in myObjArr) {
        for (key in myObjArr[i]) {
            if (myObjArr[i][key] === null) { myObjArr[i][key] = '' }
        }
    }
}

function showAllObjects() {
    let strTemp = "";
    for (i in myObjArr) {
        for (key in myObjArr[i]) {
            strTemp += myObjArr[i][key] + "  "
        }
        console.log(strTemp);
        strTemp = "";
    }
    // alert("Загляни в консоль...");
}



function hw04_json(task = +(prompt("Что? Новый хозяин! надо???  Введите номер задания:\n" + taskList, "Напечь за меня пирогов!"))) {


    switch (task) {

        case 0: { ; }; break;


        case 1: {
            // 3 persons
            // Сделать три ассоциативных массива a, b, c, 
            // в каждом из которых должны быть поля name и surname.


            function insFullname(obj, objName, i) {
                obj["name"] = (prompt(`Объект ${objName}.["name"] =  ?`, `Name_${i}`)) || "";
                obj["surname"] = (prompt(`Объект ${objName}.["surname"] =  ?`, `Surname_${i}`)) || "";
            }

            let myStr = 'abc';
            for (i = 0; i <= 2; i++) {
                insFullname(myObjArr[i], myStr[i], i);
            }

            normaliseAllObjects(); // после добавления в "insFullname(obj, objName, i)" проверки ... || ""...
            // можно и не делать normaliseAllObjects() в этом задании
            console.log(a)
            console.log(b)
            console.log(c)


        } //case #
            break;


        case 2: {
            // different fields
            // Добавьте некоторые другие поля(например age, fathername, sex(пол)) так,
            // что бы набор полей отличался у разных объектов

            hw04_json(1);

            a["age"] = +prompt(`Введите age объекта "а":`, 1);
            a["fathername"] = prompt(`Введите fathername объекта "а":`, "FathernameA");
            b["fathername"] = prompt(`Введите fathername объекта "b":`, "FathernameB");
            b["sex"] = ((prompt(`Введите sex объекта "b": (m/w)`, "m")));
            c["age"] = +prompt(`Введите возраст объекта "c":`, 3);

            normaliseAllObjects();

            console.log(a)
            console.log(b)
            console.log(c)


        } //case #
            break;


        case 3: {
            // fields check
            // Проверьте наличие необязательных полей у каждого из этих массивов.
            // Если поле найдено, выведите его с помощью alert.
            // Проверку делайте по typeof или in в if.

            hw04_json(2);

            for (person in myObjArr) {
                let strTemp = "";
                for (keyi in myObjArr[person]) {
                    if (!mustHaveKeys.includes(keyi)) { strTemp += keyi + ", " }
                }
                console.log(strTemp);
                if (strTemp !== "") {
                    alert(`В ${person}-м обьекте такие необязательные поля: \n${strTemp}`);
                } else { alert(`В ${person}-м обьекте необязательных полей нет.`) }
            }

        } //case #
            break;


        case 4: {
            // array of persons
            // Добавьте несколько ассоциативных массивов с персонами в обычный массив persons,
            //     например a, b, c.
            // Так же добавьте персону литерально({ ...}).
            // Получится обычный массив с элементами - ассоциативными массивами с персонами.

            hw04_json(2);

            myObjArr[3] = {
                name: "NameQ",
                surname: "SurnameQ",
                sex: "f"
            }
            console.log(myObjArr);

        } //case #
            break;


        case 5: {
            // loop of persons
            // Сделайте цикл, который выводит весь массив persons
            // в форме объектов console.log(persons[i])

            hw04_json(4);

            for (i in myObjArr) { console.log(myObjArr[i]) };
            alert("Загляни в консоль...");

        } //case #
            break;


        case 6: {
            // loop of name and surname
            // Сделайте цикл, который выводит весь массив persons,
            // но только Имя и Фамилию каждой персоны.

            hw04_json(4);

            let strTemp;
            for (i in myObjArr) {
                strTemp = myObjArr[i].name + " " + myObjArr[i].surname;  //можно и без промежуточной 
                console.log(strTemp);                                   // строки сразу в консоль
            }

            alert("Загляни в консоль...");

        } //case #
            break;


        case 7: {
            // loop of loop of values
            // Сделайте цикл, который выводит весь массив persons,
            // но только значения всех полей из объектов.
            // Используйте вложенный цикл

            hw04_json(4);

            showAllObjects()

        } //case #
            break;


        case 8: {
            // fullName
            // Сделайте цикл, которых добавляет поле fullName в каждый объект,
            // содержащий ФИО.
            // Учтите, что поле fathername не является обязательным.

            hw04_json(4);
            normaliseAllObjects();

            for (i in myObjArr) {
                myObjArr[i]["fullName"] = myObjArr[i].name;
                if (myObjArr[i].surname !== "") { myObjArr[i]["fullName"] += " " + myObjArr[i].surname }
                myObjArr[i]["fullName"] += (((myObjArr[i].fathername) && (" " + myObjArr[i].fathername)) || "") // после normaliseAllObjects();
            }                                                                                       // проверка (..||"") здесь лишняя
            ;                                                                                      // но лучше "пере.." чем "недо.." ))

            showAllObjects();


        } //case #
            break;


        case 9: {
            // serialize
            // Создайте JSON - строку из persons

            hw04_json(8);
            showAllObjects();
            let jsonStr = JSON.stringify(myObjArr);
            console.log(jsonStr);

        } //case #
            break;


        case 10: {
            // deserialize
            // Создайте ассоциативный массив с одной персоной из JSON - строки.
            // Добавьте её в persons

            hw04_json(8);
            showAllObjects();
            let jsonStr = `{"name":"JsonName","surname":"JsonSurname","age":2020,"fullName":"JsonName JsonSurname"}`;
            let jsonObj = JSON.parse(jsonStr);
            myObjArr.push(jsonObj);
            console.log(myObjArr);
            showAllObjects();

        } //case #
            break;


        case 11: {
            // HTML
            // Сделайте цикл, который выводит весь массив persons в форме HTML - таблицы.
            // Имя и Фамилия - колонки.

            hw04_json(10);

            let strHtml = `<table border="1" align="center">`;
            strHtml += `<tr><td>name</td><td>surname</td></tr>`;
            for (i in myObjArr) {
                strHtml += `<tr><td>${(myObjArr[i].name) || ""}</td><td>${(myObjArr[i].surname) || ""}</td></tr>`;
            };
            strHtml += `</table>`;
            document.write(strHtml);

        } //case #
            break;


        case 12: {
            // HTML optional fields
            // Сделайте цикл, который выводит весь массив persons, в форме HTML - таблицы.
            // Имя и Фамилия, а так же другие поля при наличии.
            // Колонки: поля, строки таблицы - персоны.

            hw04_json(10);

            // создаем массив всех ключей из всех объектов без повторений
            let arrOfKeys = [];
            for (i in myObjArr) {
                for (key in myObjArr[i]) {
                    if (!(arrOfKeys.includes(key))) { arrOfKeys.push(key) };
                }
            } //---------------


            // первая строка с именами колонок
            let strHtml = `<table border="1" align="center"><tr>`;
            for (i in arrOfKeys) { strHtml += `<td>${arrOfKeys[i]}</td>`; };
            strHtml += `</tr>`;


            for (i in myObjArr) {
                strHtml += `<tr>`;
                for (key in arrOfKeys) {
                    strHtml += `<td>`;
                    if (arrOfKeys[key] in myObjArr[i]) { strHtml += myObjArr[i][arrOfKeys[key]] };
                    strHtml += `</td>`;
                };
                strHtml += `</tr>`;
            }

            strHtml += `</table>`;
            document.write(strHtml);

        } //case #
            break;


        case 13: {
            // HTML tr color
            // Добавьте к предыдущему примеру раскраску через строчку
            // используя другой стиль тэга tr.

            hw04_json(10);

            // создаем массив всех ключей из всех объектов без повторений
            let arrOfKeys = [];
            for (i in myObjArr) {
                for (key in myObjArr[i]) {
                    if (!(arrOfKeys.includes(key))) { arrOfKeys.push(key) };
                }
            } //---------------


            // первая строка с именами колонок
            let strHtml = `<table border="1" align="center"><tr bgcolor="#42ecff">`;
            for (i in arrOfKeys) { strHtml += `<th>${arrOfKeys[i]}</th>`; };
            strHtml += `</tr>`;

            let colorGray = true;

            for (i in myObjArr) {
                colorGray = !colorGray;
                if (colorGray) { strHtml += `<tr bgcolor="#B0B0B0">`; } else { strHtml += `<tr>`; };
                for (key in arrOfKeys) {
                    strHtml += `<td>`;
                    if (arrOfKeys[key] in myObjArr[i]) { strHtml += myObjArr[i][arrOfKeys[key]] };
                    strHtml += `</td>`;
                };
                strHtml += `</tr>`;
            }

            strHtml += `</table>`;
            document.write(strHtml);

        } //case #
            break;


        case 14: {
            // HTML th optional
            // Переработайте вывод persons в HTML с поиском всех возможных колонок во всех записях,
            // выводом названий колонок в заголовок HTML - таблицы.
            // Для решения этой задачи вначале узнайте множество полей(ключей) во всех записях(они не совпадают),
            // выведите HTML - заголовок используя тэги < th >, а потом выводите все записи.
            // Ниже выведите все персоны построчно.Следите за корректностью колонок.
            // Для этого вам нужно итерировать общий набор колонок, а не каждую персону,
            // колонки из которой могут отличаться от предыдущей.


            // Я это уже сделал в 13 пункте
            hw04_json(13);
            ;
        } //case #
            break;


        case 15: {
            // Задание на синий пояс.
            // Сделать HTML - конструктор из деревянной структуры, которая была на прошлом занятии:

            let someTree = {
                tagName: "table", //html tag
                subTags: [ //вложенные тэги
                    {
                        tagName: "tr",
                        subTags: [
                            {
                                tagName: "td",
                                text: "some text",
                            },
                            {
                                tagName: "td",
                                text: "some text 2",
                                attrs:
                                {
                                    bgcolor: "red"
                                }
                            },
                            {
                                tagName: "th",
                                text: "some text right1",
                                attrs:
                                {
                                    bgcolor: "gray"
                                }
                            },
                        ]
                    },
                    {
                        tagName: "tr",
                        subTags: [
                            {
                                tagName: "td",
                                text: "some text 3",
                            },
                            {
                                tagName: "td",
                                text: "some text 4",
                            },
                            {
                                tagName: "td",
                                text: "some text right 2",
                            },
                        ],
                        attrs:
                        {
                            bgcolor: "#42ecff",
                        },
                    },
                    {
                        tagName: "tr",
                        subTags: [
                            {
                                tagName: "td",
                                text: "some text 5",
                            },
                            {
                                tagName: "td",
                                text: "some text 6",
                            },
                            {
                                tagName: "td",
                                text: "some text right 3",
                            },
                        ],
                        attrs:
                        {
                            bgcolor: "#00FF00",
                        },
                    },
                ],
                attrs:
                {
                    border: 1,
                    align: "center",
                },
            };

            // функция для конструкции таблиц (и не только таблиц)
            // с любым числом колонок и строк
            // с любым набором атрибутов
            function tableConstructor(item) {

                str += "<" + item.tagName;

                if ("attrs" in item) {
                    for (attrKey in item.attrs) {
                        str += " " + attrKey + `="` + item.attrs[attrKey] + `"`;
                    }
                }
                str += ">";

                if ("subTags" in item) {
                    for (i in item.subTags) { tableConstructor(item.subTags[i]); }
                };

                if ("text" in item) {
                    str += item.text;
                };
                str += "</" + item.tagName + ">";
                ;
            }; //function tableConstructor



            let str = ""
            tableConstructor(someTree);
            console.log(someTree);
            console.log(str);
            document.write(str);

            ;
        } //case #
            break;


        case 16: {
            // destruct array
            // напишите код, который используя деструктуризацию положит:
            // четные числа в переменные even1, even2,
            //     нечетные в odd1, odd2, odd3,
            //         буквы в отдельный массив

            let arr = [1, 2, 3, 4, 5, "a", "b", "c"];
            console.log(arr);

            let [odd1, even1, odd2, even2, odd3, ...charArr] = arr;
            console.log(odd1);
            console.log(odd2);
            console.log(odd3);
            console.log(even1);
            console.log(even2);
            console.log(charArr);

            ;
        } //case #
            break;


        case 17: {
            // destruct string
            // напишите код, который используя деструктуризацию положит:
            // число в переменную number
            // букву a в переменную s1
            // букву b в переменную s2
            // букву c в переменную s3

            let arr = [1, "abc"];
            console.log(arr);

            let [number, [s1, s2, s3]] = arr;

            console.log("number " + number);
            console.log("s1 " + s1);
            console.log("s2 " + s2);
            console.log("s3 " + s3);

            ;
        } //case #
            break;


        case 18: {
            // destruct 2
            // извлеките используя деструктуризацию имена детей в переменные name1 и name2

            let obj = {
                name: 'Ivan',
                surname: 'Petrov',
                children: [{ name: 'Maria' }, { name: 'Nikolay' }]
            }

            // let { children } = obj;
            // let [{ name: name1 }, { name: name2 }] = children;

            let { children: [{ name: name1 }, { name: name2 }] } = obj;

            console.log(obj);
            console.log(`name1 - ${name1}     name2 - ${name2}`);

            ;
        } //case #
            break;


        case 19: {
            // desctruct 3
            // let arr = [1, 2, 3, 4, 5, 6, 7, 10]
            // извлеките используя деструктуризацию объектов два первых элемента
            // и длину массива в переменные a, b и length


            let arr = [77, 25, 3, 4, 5, 6, 7, 10];
            console.log(arr);

            let { length: length, [0]: a, [1]: b, } = arr;

            console.log('length ' + length);
            console.log('a ' + a);
            console.log('b ' + b);


            ;
        } //case #
            break;


        case 20: {
            // Задание на черный пояс
            // Сделать предыдущее задание на черный пояс в упрощенном виде:
            // не использовать четырехмерный массив для хранения истории,
            // а использовать ассоциативный массив:
            // Например, если пользователь ввел 1212 за последние четыре хода,
            // то мы ищем то, что было введено последний раз после такой последовательности:
            // var history = "1212"
            // var predictValue = predictArray[history] // в predictValue то, что ввел последний раз пользователь после нажатий 1212
            // var newValue = prompt("введите 1 или 2", "");
            // predictArray[history] = newValue         //сохраняем новый ввод
            // //сдвигаем историю

            // не верно понял задание и алгоритм - надо переделать

            let history = ["1", "2", "1", "2"];
            let predictArray = [];
            let predictValue = {};
            let yourMove = '1';
            do {
                predictValue = predictArray[history];
                console.log(`Я предсказываю - ${predictValue}`);
                yourMove = prompt(`твое число 1 или 2 ?`)
                if (predictValue === yourMove) { alert('BINGO!!!') } else { alert(`Uuuups...`) };
                predictArray[history] = yourMove;
                history.push(yourMove);
                history.shift();
            } while (yourMove);





            // ---------РАБОТАЕТ но по неправильному алгоритму --------------------
            // ---------сравнивает не последовательность четырех ходов, а ищет последний такой же ход
            // сделаем чуть по другому : 
            // будем хранить не истоию из четырех вводов, а всю историю
            // на сколько это позволит RAM
            // почти самообучающаяся гадалка
            // let predictArray = {};
            // let newValue = myPredict = "";
            // let history = prompt(`\nВведите 1-й свой вариант без моих предсказаний:`);

            // do {    // while
            //     myPredict = "Не могу предсказать...";
            //     for (key in predictArray) {
            //         if (key === history) {
            //             (myPredict = predictArray[history]);
            //             break;
            //         }
            //     }

            //     //if (!(Object.keys(predictArray).length)) myPredict = "Не могу предсказать... ((";

            //     console.log(history + " Мне кажется это будет - ... " + myPredict);

            //     newValue = prompt(`\nВаш новый вариант?`)

            //     if (myPredict !== "Не могу предсказать...") {
            //         if (myPredict === newValue) {
            //             myPredict += " - ТЫ ПРЕДСКАЗУЕМ !!!";
            //         } else {
            //             myPredict = "Мне казалось, что это будет ... " + myPredict;
            //         }
            //     }

            //     alert(`\n${myPredict}`);

            //     predictArray[history] = newValue; // можно и массив объектов организовать и push-ить туда новые значения
            //     // но тогда надо переписать цикл перебора истории, а он уже есть и работает

            //     history = newValue;

            // } while (newValue);






            ;
        } //case #
            break;





        default: { alert("Такого мы еще не умеем...!!!") };
    }
}
