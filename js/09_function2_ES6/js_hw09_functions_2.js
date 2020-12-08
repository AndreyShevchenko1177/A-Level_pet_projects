// // ES6
// // Переделайте предыдущее ДЗ используя максимум возможностей ES6. Отметьте облегчение (или утяжеление) синтаксиса.

// // различия:;
function difference() {
    // // --- Block scope variables
    // // В ES6 мы перешли от var к let/const.
    // // блоки кода и видимость только внутри блока кода для let
    // // ---- Multi-line strings
    // // ---- Destructuring Assignment -----;
    // ES5;
    // var array = [1, 2, 3, 4];
    // var first = array[0];
    // var third = array[2];
    // ES6;
    // const array = [1, 2, 3, 4];
    // const [first, , third] = array;
    // ES6; //обмен значениями
    // let a = 1;
    // let b = 2;
    // [a, b] = [b, a];
    // ES5;
    // function margin() {
    //     var left = 1,
    //         right = 2,
    //         top = 3,
    //         bottom = 4;
    //     return { left: left, right: right, top: top, bottom: bottom };
    //             ----// или ES6 - return [left, right, top, bottom]; но вызывающему коду придется знать о порядке данных.
    // }
    // ES6;
    // const user = { firstName: "Adrian", lastName: "Mejia" };
    // function getFullName({ firstName, lastName }) {
    //     // и деструктуризация
    //     return `${firstName} ${lastName}`; // и `${ }`
    // }
    // // ------- Глубокое сопоставление
    // ES5;
    // function settings() {
    //     return { display: { color: "red" }, keyboard: { layout: "querty" } };
    // }
    // var tmp = settings();
    // var displayColor = tmp.display.color;
    // var keyboardLayout = tmp.keyboard.layout;
    // console.log(displayColor, keyboardLayout); // red querty
    // ES6;
    // function settings() {
    //     return { display: { color: "red" }, keyboard: { layout: "querty" } };
    // }
    // const {
    //     display: { color: displayColor },
    //     keyboard: { layout: keyboardLayout },
    // } = settings();
    // console.log(displayColor, keyboardLayout); // red querty
    // // Это также называют деструктуризацией объекта (object destructing).
    // // --------------- Классы и объекты ------------------------
    // В ECMAScript 6 мы перешли от “функций-конструкторов” к “классам” .
    // // Каждый объект в JavaScript имеет прототип, который является другим объектом.
    // // Все объекты в JavaScript наследуют методы и свойства от своего прототипа.
    // // В ES5 объектно - ориентированное программирование достигалось с помощью функций - конструкторов.
    // // Они создавали объекты следующим образом:
    // ES5
    // var Animal = (function () {
    //   function MyConstructor(name) {
    //     this.name = name;
    //   }
    //   MyConstructor.prototype.speak = function speak() {
    //     console.log(this.name + ' makes a noise.');
    //   };
    //   return MyConstructor;
    // })();
    // var animal = new Animal('animal');
    // animal.speak(); // animal makes a noise.
    // // В ES6 есть новый синтаксический сахар.
    // // Можно сделать то же самое с меньшим кодом и с использованием ключевых слов class и construсtor.
    // // Также заметьте, как четко определяются методы: construсtor.prototype.speak = function () vs speak():
    // ES6
    // class Animal {
    //   constructor(name) {
    //     this.name = name;
    //   }
    //   speak() {
    //     console.log(this.name + ' makes a noise.');
    //   }
    // }
    // const animal = new Animal('animal');
    // animal.speak(); // animal makes a noise.
    // // ++ наследование
    // ES6
    // class Lion extends Animal {
    //   speak() {
    //     super.speak();
    //     console.log(this.name + ' roars ');
    //   }
    // }
    // const lion = new Lion('Simba');
    // lion.speak(); // Simba makes a noise.
    // // Simba roars.
    // // ---------- Нативные промисы -------- вот тут я пока не понял, поэтому пока не заношу сюда
    // //
    // // ----- Стрелочные функции ------------ а тут как раз все понятно (как мне кажется) => тоже не заношу
    // //
    // // ----- FOR OF -------------- разве он не был всегда в JS ?????? (:шок:)
    // //
    // // ----- Параметры по умолчанию ----------------------
    // ES5;
    // function point(x, y, isFlag) {
    //     x = x || 0;
    //     y = y || -1;
    //     isFlag = isFlag || true;
    //     console.log(x, y, isFlag);
    // }
    // //
    // // ----- Rest-параметры ----------------------
    // ES6;
    // function printf(format, ...params) {
    //     console.log("params: ", params);
    //     console.log("format: ", format);
    // }
    // printf("%s %d %.2f", "adrian", 321, Math.PI);
    // //
    // // ----- Операция Spread ----------------------
    // ES6
    // Math.max(...[2,100,1,6,43]) // 100
    // // ----------Мы также перешли от concat к spread'у: -----------
    // ES5
    // var array1 = [2,100,1,6,43];
    // var array2 = ['a', 'b', 'c', 'd'];
    // var array3 = [false, true, null, undefined];
    // console.log(array1.concat(array2, array3));
    // ES6
    // const array1 = [2,100,1,6,43];
    // const array2 = ['a', 'b', 'c', 'd'];
    // const array3 = [false, true, null, undefined];
    // console.log([...array1, ...array2, ...array3]);
}
// //
// // ------------ Это только базовые возможности, о которых должен знать каждый разработчик ------------
// //
// // ----------- http://kangax.github.io/compat-table/es6/ --------------------------
// //
// //
// //

// a
// Напишите функцию a, которая просто является коротким именем для alert.

// интересно, а такой вариант решения прокатит?:
const a = alert;
// The End.

// если нет, то вот код из предыдущего ДЗ
// const a = function (message) {
//     alert(message);
// }

// ----------------------------------------------------------

// cube
// Напишите функцию cube, которая возвращает число в третьей степени:

const cube = function (toCube = 0) {
    return Math.pow(toCube, 3);
};

// ----------------------------------------------------------

// avg2
// Напишите функцию avg2, которая рассчитывает среднюю для двух чисел:

// Если без заморочек, то:
// const avg2 = (a = 0, b = 0) => (a + b) / 2;

// среднее арифметическое для любого количества аргументов
const avg2 = function (...argArr) {
    if (!argArr.length) return 0;
    return argArr.reduce((a, b) => a + b) / argArr.length;
};

// ----------------------------------------------------------

//  sum3
// Напишите функцию sum3 для суммирования 3 чисел:
// Обратите внимание, что sum3 от двух параметров тоже работает корректно.

const arrSum = function (arr) {
    let sum = 0;
    for (item of arr) sum += item;
    return sum;
};

// ----------------------------------------------------------

// intRandom
// Напишите функцию intRandom, которая принимает два параметра: нижнюю и верхнюю границу,
// и возвращает целое случайное число из этого диапазона включительно:
// Обратите внимание, что если передан один параметр (intRandom(10) в примере выше),
// то функция работает как будто первый параметр равен 0,
// а переданный параметр становится вторым параметром(intRandom(0, 10))
// Используйте умножение для расширения значения встроенной функции Math.random c диапозона 1,
// сложениe для смещения результата на первый параметр, и Math.round для округления результата

const intRandom = function (min = 1, max = 0) {
    return min + Math.round(Math.random() * (max - min));
};

// ----------------------------------------------------------

// greetAll
// Сделайтей функцию, которая приветствует всех, кто передан в качестве параметров.
// Вам поможет arguments и for

const greetAll = function greetAll() {
    let arr = [...arguments];
    let all = arr.join(", ");
    if (all) {
        console.log(`Hi, ${all}!`);
        alert(`Hi, ${all}!`);
    }
};

// ----------------------------------------------------------

// sum
// Напишите функцию sum, которая сумирует любое количество параметров:
// Используйте псевдомассив arguments для получения всех параметров,
// и for для итерирования по нему

const sum = function () {
    var total = 0;
    for (let item of arguments) {
        if (!isNaN(item)) total += +item;
    }
    return total;
};

// ----------------------------------------------------------

// sort
// Сделайте обобщенную функцию сортировки массива

var persons = [
    { name: "Иван", age: 17 },
    { name: "Мария", age: 35 },
    { name: "Алексей", age: 73 },
    { name: "Яков", age: 12 },
];

sort = function (arr, key = undefined, direction = true) {
    if (direction) {
        arr.sort(function (a, b) {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        });
    } else
        arr.sort(function (a, b) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        });
    return arr;
};

// sort(persons, "age"); //сортирует по возрасту по возрастанию
// sort(persons, "name", false); //сортирует по имени по убыванию

// ----------------------------------------------------------

// array map
// Используя Array.map приведите все строки в массиве к числу.
// Элементы других типов оставьте как есть:
// ["1", {}, null, undefined, "500", 700]
// должно превратиться в
// [1, {}, null, undefined, 500, 700]

let arr = ["1", {}, null, undefined, "500", 700].map((item) => parseInt(item, 10) || item);

// ----------------------------------------------------------

// array reduce
// Получите произведение всех чисел в массиве, используя Array.reduce.
// Не обрабатывайте типы данных, не являющиеся числом.
// ["0", 5, 3, "string", null]
// резуль?тат должен быть 15

let composition = ["0", 5, 3, "string", null].reduce((a, b) => (typeof b == "number" ? a * b : a), 1);

// ----------------------------------------------------------

// object filter
// Напишите свою реализацию Array.filter для объектов:
// filter(phone,(key,value) => key == "color" || value == 2);
// должно вернуть
// {
//     ram: 2,
//     color: "black",
// }
// Для удаления пары ключ - значение используйте delete.Или сделайте копию объекта.

let phone = {
    brand: "meizu",
    model: "m2",
    ram: 2,
    color: "black",
};

// возвращает измененую ПОВЕРХНОСТНУЮ копию
function filterCopy(obj, func) {
    let objCopy = Object.assign({}, obj);
    for (let [key, value] of Object.entries(objCopy)) {
        if (!func(key, value)) delete objCopy[key];
    }
    return objCopy;
}

let phoneNew = filterCopy(phone, (key, value) => key == "color" || value == 2);

// меняет существующий объект
function filter(obj, func) {
    for (let [key, value] of Object.entries(obj)) {
        if (!func(key, value)) delete obj[key];
    }
}

filter(phone, (key, value) => key == "color" || value == 2);

// ----------------------------------------------------------

// object map
// Напишите свою реализацию Array.map для объектов:
// map({ name: "Иван", age: 17 }, function (key, value) {
//     var result = {};
//     result[key + "_"] = value + "$";
//     return result;
// }); //должен вернуть {name_: "Иван$", age_: "17$"}

const map = function (obj, func) {
    let objNew = {};
    for (let key in obj) {
        objNew = { ...objNew, ...func(key, obj[key]) };
    }
    return objNew;
};

let testObj = map({ name: "Иван", age: 17 }, function (key, value) {
    var result = {};
    result[key + "_"] = value + "$";
    return result;
});

// ----------------------------------------------------------

// Рекурсия
// Sum
// Напишите функцию, который будет считать сумму арифметической прогрессии рекурсивно.

// В качестве параметров передаем 1-й элемент прогрессии, инкремент
// и сколько элементов прогрессии надо просуммировать
const sum = function (startValue, inc, numberOfElements) {
    if (numberOfElements < 1) return 0;
    if (numberOfElements === 1) return startValue;
    return startValue + sum(startValue + inc, inc, numberOfElements - 1);
};

// ----------------------------------------------------------

// HTML Tree
// Сделать задание на синий пояс, используя рекурсию, без ограничения вложенности.

// сделано еще в прошлый раз

let someTree = {
    tagName: "table", //html tag
    subTags: [
        //вложенные тэги
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
                    attrs: {
                        bgcolor: "red",
                    },
                },
                {
                    tagName: "th",
                    text: "some text right1",
                    attrs: {
                        bgcolor: "gray",
                    },
                },
            ],
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
            attrs: {
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
            attrs: {
                bgcolor: "#00FF00",
            },
        },
    ],
    attrs: {
        border: 1,
        align: "center",
    },
};

// функция для конструкции таблиц (и не только таблиц)
// с любым числом колонок и строк
// с любым набором атрибутов
const сonstructor = function (item) {
    let node = document.createElement(item.tagName);
    if ("attrs" in item) {
        for (attrKey in item.attrs) {
            node.setAttribute(attrKey, item.attrs[attrKey]);
        }
    }

    if ("subTags" in item) {
        for (i in item.subTags) {
            node.append(сonstructor(item.subTags[i]));
        }
    }
    debugger;
    if ("text" in item) {
        node.innerText = item.text;
    }
    return node;
};

document.body.append(сonstructor(someTree));
