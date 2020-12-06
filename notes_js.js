//

//

//

try {
    something;
} catch (e) {
    window.location.href = "http://stackoverflow.com/search?q=[js] + " + e.massage;
}

//

//

//

// Object.entries() метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value],
// в том же порядке, что и в цикле for...in (разница в том, что for-in перечисляет свойства из цепочки прототипов).
// Порядок элементов в массиве который возвращается Object.entries() не зависит от того как объект обьявлен.
// Если существует необходимость в определенном порядке, то  массив должен быть отсортирован до вызова метода,
// например Object.entries(obj).sort((a, b) => a[0] - b[0]);.

for (let i in persons) {
    for (let [key, value] of Object.entries(persons[i])) {
        console.log(`${key}: ${value}`);
        str += `<tr><td>${key}</td><td>${value}</td></tr>`;
    }
}

//

//---------------------------- если надо развернуть в линию многомерный массив

predictArray
    .reduce(function (a, b) {
        return a.concat(b);
    })
    .reduce(function (a, b) {
        return a.concat(b);
    })
    .reduce(function (a, b) {
        return a.concat(b);
    });

//

//----------------------------------Многомерный массив

// for (i = 0; i < 2; i++) {
//     predictArray[i] = [];
//     for (j = 0; j < 2; j++) {
//         predictArray[i][j] = [];
//         for (k = 0; k < 2; k++) {
//             predictArray[i][j][k] = [];
//             for (l = 0; l < 2; l++) {
//                 predictArray[i][j][k][l] = (-1);
//             }

//         }
//     }
// }

//Вместо этих 4-х вложенных циклов можно одной строкой

predictArray = Array.from(Array(2), () =>
    Array.from(Array(2), () => Array.from(Array(2), () => Array.from(Array(2), () => -1)))
);
//

// ----------------------------------------------------------------------

// почему если в первом случае массив пустой, то ничего не происходит
let myArr = new Array(3);
console.log(myArr);
for (let key in myArr) {
    myArr[key] = key;
}
console.log(myArr);
//  (3) [empty × 3]
//  [empty × 3]

// а во втором случае когда элементы массива не пустые -  все работает?
let myArr = [5, 6, 7];
console.log(myArr);
for (let key in myArr) {
    myArr[key] = key;
}
console.log(myArr);
// (3) [5, 6, 7]
//  (3) ["0", "1", "2"]

//

//

// ----------------------------------------дата-год

new Date().getFullYear();

//

// ----------------------------------------------- JSON

// JSON.stringify(value[, replacer[, space]])
// Параметры
// value
// Значение, преобразуемое в строку JSON.
// replacer Необязательный
// Если является функцией, преобразует значения и свойства по ходу их преобразования в строку;
// если является массивом, определяет набор свойств, включаемых в объект в окончательной строке.
// Подробное описание функции replacer даётся в статье Использование родного объекта JSON руководства по JavaScript.
// space Необязательный
// Делает результат красиво отформатированным (расставляя пробелы).

// Пример использования параметра replacer
var foo = {
    foundation: "Mozilla",
    model: "box",
    week: 45,
    transport: "car",
    month: 7,
};

JSON.stringify(foo, function (key, value) {
    if (typeof value === "string") {
        return undefined; // удаляем все строковые свойства
    }
    return value;
}); // '{"week":45,"month":7}'

JSON.stringify(foo, ["week", "month"]);
// '{"week":45,"month":7}', сохранились только свойства week и month

//

// --------------------------------------------------------- ДЕСТРУКТУРИЗАЦИЯ

// destruct array
// напишите код, который используя деструктуризацию положит:
// четные числа в переменные even1, even2,
//     нечетные в odd1, odd2, odd3,
//         буквы в отдельный массив

let arr = [1, 2, 3, 4, 5, "a", "b", "c"];

let [odd1, even1, odd2, even2, odd3, ...charArr] = arr;

// destruct string
// напишите код, который используя деструктуризацию положит:
// число в переменную number
// букву a в переменную s1
// букву b в переменную s2
// букву c в переменную s3

let arr = [1, "abc"];

let [number, [s1, s2, s3]] = arr;

// destruct 2
// извлеките используя деструктуризацию имена детей в переменные name1 и name2

let obj = {
    name: "Ivan",
    surname: "Petrov",
    children: [{ name: "Maria" }, { name: "Nikolay" }],
};

// let { children } = obj;
// let [{ name: name1 }, { name: name2 }] = children;

let {
    children: [{ name: name1 }, { name: name2 }],
} = obj;

// desctruct 3
// let arr = [1, 2, 3, 4, 5, 6, 7, 10]
// извлеките используя деструктуризацию объектов два первых элемента
// и длину массива в переменные a, b и length

let arr = [77, 25, 3, 4, 5, 6, 7, 10];

let { length: length, [0]: a, [1]: b } = arr;

//

// ---------------------------------------------------------

// События mouseover/mouseout, relatedTarget
// Событие mouseover происходит в момент, когда курсор оказывается над элементом, а событие mouseout – в момент, когда курсор уходит с элемента.
// Эти события являются особенными, потому что у них имеется свойство relatedTarget. Оно «дополняет» target.
// Когда мышь переходит с одного элемента на другой, то один из них будет target, а другой relatedTarget.

// Для события mouseover:
// event.target – это элемент, на который курсор перешёл.
// event.relatedTarget – это элемент, с которого курсор ушёл (relatedTarget → target).
// Для события mouseout наоборот:

// event.target – это элемент, с которого курсор ушёл.
// event.relatedTarget – это элемент, на который курсор перешёл (target → relatedTarget).

// Событие mouseover, происходящее на потомке, всплывает. Поэтому если на родительском элементе есть такой обработчик, то оно его вызовет.

//-------------------------------------------------------

// События mouseenter и mouseleave
// События mouseenter / mouseleave похожи на mouseover / mouseout.
// Они тоже генерируются, когда курсор мыши переходит на элемент или покидает его.

// Но есть и пара важных отличий:

// Переходы внутри элемента, на его потомки и с них, не считаются.
// События mouseenter/mouseleave не всплывают.
// События mouseenter/mouseleave предельно просты и понятны.

// Когда указатель появляется над элементом – генерируется mouseenter,
//   причём не имеет значения, где именно указатель: на самом элементе или на его потомке.

// Событие mouseleave происходит, когда курсор покидает элемент.
