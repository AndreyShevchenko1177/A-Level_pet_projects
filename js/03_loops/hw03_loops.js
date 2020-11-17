
let taskList = (`
1 html tree
2 declarative fields
3 object links
4 imperative array fill 3
5 while confirm (confirm наоборот)
6 array fill
7 array fill nopush
8 infinite probability (бесконечный rundom)
9 empty loop (prompt наоборот)
10 progression sum
11 chess one line (Шахматы в линию)
12 numbers (Башня из цифр 0123456789)
13 chess (Шахматная доска)
14 cubes (Возведение в степень)
15 multiply table (табл умножения)
16 matrix to html table
17 Задание на синий пояс: Треугольник
18 Задание на черный пояс: Электронная гадалка
`)

function hw03_loops() {
    var task = +(prompt("Что? Новый хозяин! надо???  Введите номер задания:\n" + taskList, "Напечь за меня пирогов!").toLowerCase());
    switch (task) {
        case 1: {
            // <body>
            //     <div>
            //         <span>Enter a data please:</span><br />
            //         <input type='text' id='name'>
            //             <input type='text' id='surname'>
            //         </div>
            //             <div>
            //                 <button id='ok'>OK</button>
            //                 <button id='cancel'>Cancel</button>
            //             </div>
            //     </body>
            // Сделайте декларативную JSON-структуру для тэгов выше, в которой:;



            let tree = {
                tagName: "body",
                attrs: [],
                subTags: [
                    {
                        tagName: "div",
                        attrs: [],
                        subTags: [
                            {
                                tagName: "span",
                                attrs: [],
                                subTags: {},
                                text: "Enter a data please:",
                            },
                            {
                                tagName: "br/",
                                attrs: [],
                                subTags: {},
                                text: "",
                            },
                            {
                                tagName: "input",
                                attrs: [
                                    {
                                        atrName: "type",
                                        atrVol: "text"
                                    },
                                    {
                                        atrName: "id",
                                        atrVol: "name"
                                    }
                                ],
                                subTags: {},
                                text: "",
                            },
                            {
                                tagName: "input",
                                attrs: [

                                    {
                                        atrName: "type",
                                        atrVol: "text"
                                    },
                                    {
                                        atrName: "id",
                                        atrVol: "surname"
                                    }
                                ],
                                subTags: {},
                                text: "",
                            },

                        ],
                        text: "",
                    },
                    {
                        tagName: "div",
                        attrs: [],
                        subTags: [
                            {
                                tagName: "button",
                                attrs: [],
                                subTags: [
                                    {
                                        atrName: "id",
                                        atrVol: "ok"
                                    }
                                ],
                                text: "OK",
                            },
                            {
                                tagName: "button",
                                attrs: [
                                    {
                                        atrName: "id",
                                        atrVol: "cansel"
                                    }
                                ],
                                subTags: [],
                                text: "Cansel",
                            }
                        ],
                        text: "",
                    },
                ],
                text: "",
            };

            console.log(tree);

            // Выведите значения текста во второй кнопке, используя.и[].
            console.log(tree.subTags[1].subTags[1].text);

            // Выведите значение атрибута id во втором input, используя.и[].
            console.log(tree.subTags[0].subTags[3].attrs[1].atrVol);

        };
            break;


        case 2: {
            // Как известно, элемент массива и объекта может быть любого типа данных JS, т.е.в коде может быть любое выражение, которое вычисляется в то или иное значение типа данных.А значит, мы можем применять функции для ввода данных типа confirm или prompt:
            // var text = "Enter a number";
            // var arr3 = [+prompt(text), +prompt(text), +prompt(text)]; //вводим числа.
            // Организуйте таким способом заполнение полей в объектах:

            let notebook = {
                brand: prompt("Введите бренд:", "HP"),
                type: prompt("Введите тип:", "440 G4"),
                model: prompt("Введите модель:", "Y7Z75EA"),
                ram: +prompt("Введите объем ОЗУ:", "4"),
                size: prompt("Введите диагональ:", "14"),
                weight: +prompt("Вес:", "1.8"),
                resolution: {
                    width: +prompt("Разрешение по горизонтали:", "1920"),
                    height: +prompt("Разрешение по вертикали:", "1080"),
                },
            };

            let phone = {
                brand: prompt("Введите бренд", "meizu"),
                model: prompt("Введите модель", "m2"),
                ram: +prompt("Введите объем ОЗУ", 2),
                color: prompt("Введите цвет", "black"),
            };

            let person = {
                name: prompt("Введите имя", "Donald"),
                surname: prompt("Введите фамилию", "Trump"),
                married: confirm("Вы женаты?"),
            }

        };
            break;


        case 3: {
            // Добавьте персоне гаджеты, используя новые поля smartphone и laptop в объекте персоны
            // Добавьте владельца в гаджеты, используя новое поле owner в объектах телефона и ноутбука.
            // обратите внимание на цикличность ссылок в объектах, если вы все сделали правильно, то
            // person.smartphone.owner.laptop.owner.smartphone == person.smartphone

            let person = {
                name: prompt("Введите имя", "Donald"),
                surname: prompt("Введите фамилию", "Trump"),
                married: confirm("Вы женаты?"),
            }

            if (confirm("Ноутбук есть?")) {
                person["laptop"] = {
                    owner: person,
                    brand: prompt("Введите бренд:", "HP"),
                    type: prompt("Введите тип:", "440 G4"),
                    model: prompt("Введите модель:", "Y7Z75EA"),
                    ram: +prompt("Введите объем ОЗУ:", "4"),
                    size: prompt("Введите диагональ:", "14"),
                    weight: +prompt("Вес:", "1.8"),
                    resolution: {
                        width: +prompt("Разрешение по горизонтали:", "1920"),
                        height: +prompt("Разрешение по вертикали:", "1080"),
                    }
                }
            }

            if (confirm("Смартфон есть?")) {
                person["smartphone"] = {
                    owner: person,
                    brand: prompt("Введите бренд", "meizu"),
                    model: prompt("Введите модель", "m2"),
                    ram: +prompt("Введите объем ОЗУ", 2),
                    color: prompt("Введите цвет", "black"),
                };
            }

            alert(`person.smartphone.owner.laptop.owner.smartphone == person.smartphone\n${person.smartphone.owner.laptop.owner.smartphone == person.smartphone}`)


        };
            break;


        case 4: {
            // Создайте пустой массив и добавьте в него три элемента, введенные пользователем(prompt), 
            // используя императивный подход(несколько операторов подряд)

            let myArr = [];
            for (let i = 0; i < 3; i++) { myArr[i] = prompt(`Введите значение ${i}-го элемента массива:`) };
            alert(myArr);

        };
            break;


        case 5: {
            // Сделайте цикл с confirm, который продолжается по Отмена и заканчивается по ОК.
            while (!confirm("Еще разок?"));
        };
            break;


        case 6: {
            // Создайте пустой массив и добавляйте в него элементы, пока пользователь не нажмет Отмена в очередном prompt.
            // Используйте push для удобства: push

            let myArr = [];
            do {
                myArr.push(prompt(`Введите значение ${myArr.length}-го элемента массива:`));
            } while (myArr[myArr.length - 1] !== null);
            // myArr.length = myArr.length - 1;   // тоже работает
            myArr.pop();
            alert(myArr);
            console.log(myArr);
        };
            break;


        case 7: {
            // Сделайте предыдущее задание, не используя push, а обращаясь к элементам по индексу.

            let myArr = [];
            do {
                myArr[myArr.length] = prompt(`Введите значение ${myArr.length}-го элемента массива:`);
            } while (myArr[myArr.length - 1] !== null);
            myArr.length = myArr.length - 1;
            // myArr.pop();  // тоже работает
            alert(myArr);
            console.log(myArr);
        };
            break;


        case 8: {
            // Создайте бесконечный цикл, который прерывается с помощью конструкции break, когда Math.random() > 0.9.
            // Код должен подсчитывать количество итераций и вывести это число с помощью alert.

            let i = k = 0;
            do {
                debugger;
                k = Math.random();
                if (k > 0.9) break;
                i++;
            } while (true);
            alert(`Последнее число: ${k}\nЧисло итераций: ${i} +1 последняя`);

        };
            break;


        case 9: {
            // Сделайте цикл с prompt, который прерывается по нажатию OK и
            //  продолжается по нажатию "Отмена" c пустым телом цикла.
            let a;
            while ((a = prompt("OK - выйдет из цикла\nCancel - продолжит цикл")) === null) { };

        };
            break;


        case 10: {
            // Подсчитать сумму арифметической прогрессии от 1 до N c шагом 3(1, 4, 7....) используя цикл for.
            let maxNumber = (+prompt("До какого числа подсчитывать арифметическую прогрессию?", 1)) + 1;
            let mySum = 0;
            let sequence = "";

            for (let i = 1; i < maxNumber; (i += 3)) {
                mySum = mySum + i;
                sequence = sequence + ", " + i;
            };
            alert(`Max = ${maxNumber - 1}\n${sequence.slice(2, sequence.length)}\nСумма = ${mySum}`);

        };
            break;


        case 11: {
            // Сформировать строку " # # # # # " с помощью цикла for.
            // Длина строки может быть четной и нечетной, и указывается в одном месте в коде.

            let leng;
            let str = str1 = "";
            leng = +prompt("Какую длину строки формировать?", 10);
            for (let i = 0; i < leng; i += 2) {
                str = str + " #";
            }
            str1 = str.slice(0, leng);
            alert(`"${str1}"`);

        };
            break;


        case 12: {
            // Сформировать строку c помощью вложенных циклов.Для перевода строки используйте \n.
            // 0123456789
            // 0123456789
            // 0123456789
            // 0123456789
            // 0123456789
            // 0123456789
            // 0123456789
            // 0123456789
            // 0123456789
            // 0123456789

            let str = str1 = "";
            let hi;
            hi = +prompt("Какой высоты строить башню?", 5);
            for (let i = 0; i < hi; i++) {
                for (j = 0; j < 10; j++) { str = str + j; };
                str = str + `\n`
            }
            str1 = str.slice(0, -1);
            alert(str1);

        };
            break;


        case 13: {
            // Сформируйте строку с шахматной доской из вложенных циклов.
            // Для перевода строки используйте \n.Код должен поддерживать легкое изменение размеров доски.
            // .#.#.#.#.#.#
            // #.#.#.#.#.#.
            // .#.#.#.#.#.#
            // #.#.#.#.#.#.
            // .#.#.#.#.#.#
            // #.#.#.#.#.#.
            // .#.#.#.#.#.#
            // #.#.#.#.#.#.
            // .#.#.#.#.#.#
            // #.#.#.#.#.#.


            //  ---------------ТОЖЕ РАБОЧИЙ ВАРИАНТ
            // let x = y = 0;
            // let str = strtemp = "";
            // x = +prompt("Ширина доски?", 5);
            // y = +prompt("Высота доски?", 5);
            // for (i = 0; i < y; i = i + 2) {
            //     strtemp = "";
            //     for (k = 0; k < x; k = k + 2) { strtemp = strtemp + "_#"; };
            //     str = str + strtemp.slice(0, x) + "\n";
            //     strtemp = "";
            //     for (k = 0; k < x; k = k + 2) { strtemp = strtemp + "#_"; };
            //     str = str + strtemp.slice(0, x) + "\n";
            // }
            // strtemp = str.slice(0, (x * y + y - 1));
            // alert(`${x} x ${y}\n${strtemp}`);

            let x = y = 0;
            let str = str2 = "";
            x = +prompt("Ширина доски?", 5);
            y = +prompt("Высота доски?", 5);
            for (let i = 1; i < x + 2; i = i + 2) { str = str + "_#" };
            for (let i = 0; i < y; i++) { str2 = str2 + str.slice((i % 2), (x + (i % 2))) + "\n"; }
            str = str2.slice(0, -1);
            alert(`${x} x ${y}\n${str}`);





        };
            break;


        case 14: {
            // Сформируйте массив из N элементов, содержащий в себе кубы индексов, т.е:
            // [0, 1, 8, 27, 64...]

            let cubes = [];
            let namOfItem = +prompt("Сколько элементов создать?", 5);
            let pow = +prompt("В какую степень возводить?", 3);
            for (let i = 0; i <= namOfItem; i++) {
                cubes[i] = Math.pow(i, pow);
            }
            alert(cubes);

        };
            break;


        case 15: {
            // C помощью вложенного цикла сформируйте массив массивов "таблица умножения".Для инициализации вложенных массивов используйте
            // arr[i] = [] //в i-тый элемент массива заносится новый пустой массив
            // arr[5][6] должен быть равен, соответственно, 30, arr[7][2] == 14 и так далее.

            let n = m = 10;
            let str = "";
            var masMultip = [];
            for (var i = 1; i <= m; i++) {
                masMultip[i] = [];
                str = "";
                for (var j = 1; j <= n; j++) {
                    masMultip[i][j] = i * j;
                    if (masMultip[i][j] < 10) { str = str + "0" }
                    str = str + masMultip[i][j] + " ";
                }
                str = "<div>" + str + "</div>";
                document.write(str);
            }
        };
            break;


        case 16: {
            // Сделайте вложенный цикл, который формирует HTML - таблицу 
            // в переменной строкового типа из любого двумерного массива.
            //     Т.е.если в нём использовать результат работы предыдущего задания,
            //         то получится таблица умножения в HTML(Таблица Пифагора)

            let n = m = 10;
            let str1 = str = `<table border="1" align="center">`;
            var masMultip = [];
            for (var i = 1; i <= m; i++) {
                masMultip[i] = [];
                str1 = ``;
                for (var j = 1; j <= n; j++) {
                    masMultip[i][j] = i * j;
                    str1 = str1 + `<td align="center">` + masMultip[i][j] + `</td>`;
                }
                str = str + `<tr>` + str1 + `</tr>`;
            }
            str = str + `</table>`
            document.write(str);
        };
            break;


        case 17: {
            // Сформировать следующую строку - треугольник:
            // .....#.....
            // ....###....
            // ...#####...
            // ..#######..
            // ###########

            let hi;
            hi = +prompt("Задайте высоту пирамиды:", 6);
            let str = "";
            for (let i = 1; i <= hi; i++) {
                for (k = 1; k <= hi - i; k++) { str = str + "."; }
                for (k = 1; k <= ((i - 1) * 2 + 1); k++) { str = str + "#"; }
                for (k = 1; k <= hi - i; k++) { str = str + "."; }
                str = str + "\n"
            }
            console.log(str);
            alert(str);


        };
            break;


        case 18: {
            // Пользователь вводит 0 или 1. 
            // Гадалка пытается угадать, что введет пользователь(естественно перед его вводом),
            //     но не показывает пользователю, что бы пользователь не выбрал противоположный вариант,
            //         а выводит предполагаемый вариант в консоль, скрытую от пользователя.

            let predictArray = [];
            let history = [];
            let a;
            for (i = 0; i < 4; i++) {
                history[i] = prompt("Введи 1 или 0", 1);
                gad = (Math.round(Math.random()));
                (!!gad) && !alert(`${gad} - BINGO !!!`) || alert(`${gad} - Uuups...`);
                predictArray[i] = [];
                for (j = 0; j < 4; j++) {
                    predictArray[i][j] = [];
                    for (k = 0; k < 4; k++) {
                        predictArray[i][j][k] = [];
                        for (l = 0; l < 4; l++) {
                            predictArray[i][j][k][l] = (-1);
                        }

                    }
                }
            }
            // еще не доделал
            debugger;
            while ((a = prompt("Введи 1 или 0")) !== "0") {

            }

        };
            break;

        default: { alert("Такого мы еще не умеем...!!!") };
    }
}