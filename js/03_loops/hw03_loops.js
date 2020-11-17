
let taskList = (`
1 html tree
2 declarative fields
3 object links
4 imperative array fill 3
5 while confirm
6 array fill
7 array fill nopush
8 infinite probability
9 empty loop
10 progression sum
11 chess one line
12 numbers
13 chess
14 cubes
15 multiply table
16 matrix to html table
17 Задание на синий пояс: Треугольник
18 Задание на черный пояс: Электронная гадалка
`)

function hw03_logika_v2() {
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

            while ((!(a = prompt())) || (!(a="")))    { };

        };
            break;


        case 10: {
            // Подсчитать сумму арифметической прогрессии от 1 до N c шагом 3(1, 4, 7....) используя цикл for.
        };
        // break;


        case 11: {
            // Сформировать строку " # # # # # " с помощью цикла for.Длина строки может быть четной и нечетной, и указывается в одном месте в коде.
        };
        // break;


        case 12: {
            // Сформировать строку c помощью вложенных циклов.Для перевода строки используйте \n.
        };
        // break;


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
        };
        // break;


        case 14: {
            // Сформируйте массив из N элементов, содержащий в себе кубы индексов, т.е:
            // [0, 1, 8, 27, 64...]
        };
        // break;


        case 15: {
            // C помощью вложенного цикла сформируйте массив массивов "таблица умножения".Для инициализации вложенных массивов используйте
            // arr[i] = [] //в i-тый элемент массива заносится новый пустой массив
            // arr[5][6] должен быть равен, соответственно, 30, arr[7][2] == 14 и так далее.
        };
        // break;


        case 16: {
            // Сделайте вложенный цикл, который формирует HTML - таблицу в переменной строкового типа из любого двумерного массива.Т.е.если в нём использовать результат работы предыдущего задания, то получится таблица умножения в HTML(Таблица Пифагора)
        };
        // break;


        case 17: {
            // Сформировать следующую строку - треугольник:
            // .....#.....
            // ....###....
            // ...#####...
            // ..#######..
            // ###########
        };
        // break;


        case 18: {
            // Пользователь вводит 0 или 1. Гадалка пытается угадать, что введет пользователь(естественно перед его вводом), но не показывает пользователю, что бы пользователь не выбрал противоположный вариант, а выводит предполагаемый вариант в консоль, скрытую от пользователя.
        };
        // break;

        default: { alert("Такого мы еще не умеем...!!!") };
    }
}