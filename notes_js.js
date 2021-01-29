// prettier-ignore

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

// Object.entries() метод возвращает массив собственных перечисляемых свойств указанного 
объекта в формате[key, value],
    // в том же порядке, что и в цикле for...in (разница в том, что for-in перечисляет свойства 
    из цепочки прототипов).
// Порядок элементов в массиве который возвращается Object.entries() не зависит от того как 
объект обьявлен.
// Если существует необходимость в определенном порядке, то  массив должен быть отсортирован 
до вызова метода,
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


let arg = [].slice.call(arguments, 2);
       arg = arg[0].filter(index => index != undefined)

// ----------------------------------------------------------------------


         
         
         
/ HTML th optional
// Переработайте вывод persons в HTML с поиском всех возможных колонок во всех записях, выводом названий колонок в заголовок HTML-таблицы. Для решения этой задачи вначале узнайте множество полей (ключей) во всех записях (они не совпадают), выведите HTML-заголовок используя тэги <th>, а потом выводите все записи. Ниже выведите все персоны построчно. Следите за корректностью колонок. Для этого вам нужно итерировать общий набор колонок, а не каждую персону, колонки из которой могут отличаться от предыдущей.
    var arrHead = Array.from(new Set(persons.map(objPerson => Object.keys(objPerson)).flat()))  // ОРГАЗМ!
    // Array.from(new Set(                                                  убрать дубликаты
    //     persons.map(                                                     перечисление
    //         objPerson => Object.keys(objPerson)                          взять ключи объекта
    //         ).flat()                                                     сделать массив одномерным
    // ))
    // https://webformyself.com/kak-proizvesti-udalenie-dublej-massiva-v-es6/ - способы убрать дубликаты

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
// Подробное описание функции replacer даётся в статье Использование родного 
объекта JSON руководства по JavaScript.
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
// Событие mouseover происходит в момент, когда курсор оказывается над элементом, а событие
mouseout – в момент, когда курсор уходит с элемента.
    // Эти события являются особенными, потому что у них имеется свойство relatedTarget.
    Оно «дополняет» target.
// Когда мышь переходит с одного элемента на другой, то один из них будет target, 
а другой relatedTarget.

// Для события mouseover:
// event.target – это элемент, на который курсор перешёл.
// event.relatedTarget – это элемент, с которого курсор ушёл (relatedTarget → target).
// Для события mouseout наоборот:

// event.target – это элемент, с которого курсор ушёл.
// event.relatedTarget – это элемент, на который курсор перешёл (target → relatedTarget).

// Событие mouseover, происходящее на потомке, всплывает. Поэтому если на родительском 
элементе есть такой обработчик, то оно его вызовет.

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

//-------------------------------------------------------

// Object.keys, values, entries
// Давайте отойдём от отдельных структур данных и поговорим об их переборе вообще.

// В предыдущей главе мы видели методы map.keys(), map.values(), map.entries().

// Это универсальные методы, и существует общее соглашение использовать их для структур данных.
// Если бы мы делали собственную структуру данных, нам также следовало бы их реализовать.

// Методы поддерживаются для структур:

// Map
// Set
// Array
// Простые объекты также можно перебирать похожими методами, но синтаксис немного отличается.

// Object.keys, values, entries
// Для простых объектов доступны следующие методы:

// Object.keys(obj) – возвращает массив ключей.
// Object.values(obj) – возвращает массив значений.
// Object.entries(obj) – возвращает массив пар [ключ, значение].

// Object.keys/values/entries игнорируют символьные свойства
// Так же, как и цикл for..in, эти методы игнорируют свойства, использующие Symbol(...)
в качестве ключей.

// Обычно это удобно. Но если требуется учитывать и символьные ключи, то для этого существует 
отдельный метод
// Object.getOwnPropertySymbols, возвращающий массив только символьных ключей.
//     Также, существует метод Reflect.ownKeys(obj), который возвращает все ключи.

let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    // преобразовать в массив, затем map, затем fromEntries обратно объект
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8

//-------------------------------------------------------


Итого
Методы для создания узлов:

document.createElement(tag) – создаёт элемент с заданным тегом,
document.createTextNode(value) – создаёт текстовый узел (редко используется),
elem.cloneNode(deep) – клонирует элемент, если deep==true, то со всеми дочерними элементами.

Вставка и удаление:

node.append(...nodes or strings) – вставляет в node в конец,
node.prepend(...nodes or strings) – вставляет в node в начало,
node.before(...nodes or strings) – вставляет прямо перед node,
node.after(...nodes or strings) – вставляет сразу после node,
node.replaceWith(...nodes or strings) – заменяет node.
node.remove() – удаляет node.

Устаревшие методы:

parent.appendChild(node)
parent.insertBefore(node, nextSibling)
parent.removeChild(node)
parent.replaceChild(newElem, node)

Все эти методы возвращают node.

Если нужно вставить фрагмент HTML, то elem.insertAdjacentHTML(where, html) вставляет в
зависимости от where:

"beforebegin" – вставляет html прямо перед elem,
"afterbegin" – вставляет html в elem в начало,
"beforeEnd" – вставляет html в elem в конец,
"afterend" – вставляет html сразу после elem.

Также существуют похожие методы elem.insertAdjacentText и elem.insertAdjacentElement, они
вставляют текстовые строки и элементы,
    но они редко используются.

Чтобы добавить HTML на страницу до завершения её загрузки:

document.write(html)
После загрузки страницы такой вызов затирает документ.В основном встречается в старых скриптах.

//

//


=============== sort Input

 sel - noda
const sortInput = function (sel) {
                    var arr = Array.from(sel.children).sort((x, y) => {
                        return x.text.localeCompare(y.text);
                    });
                    arr.forEach((x) => sel.appendChild(x));
                    sel.selectedIndex = 0;
                };





// --------- bind

//  у функций есть встроенный метод bind, который позволяет зафиксировать this.
// Базовый синтаксис bind:

let boundFunc = func.bind(context, [arg1], [arg2], ...);

// Другими словами, вызов boundFunc подобен вызову func с фиксированным this.
// Это позволяет привязать контекст this и начальные (!!!) аргументы функции.

let user = {
  firstName: "Вася"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // Вася

// ------

function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10

//

// Частичное применение без контекста
// Что если мы хотим зафиксировать некоторые аргументы, но не контекст this? Например,
 для метода объекта.
// Встроенный bind не позволяет этого. Мы не можем просто опустить контекст и перейти к аргументам.
// К счастью, легко создать вспомогательную функцию partial, которая привязывает только аргументы.
// Вот так:

function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

// использование:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// добавляем частично применённый метод с фиксированным временем
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Что-то вроде этого:
// [10:00] John: Hello!






// Существует специальный встроенный метод функции func.call(context, …args),
// который позволяет вызывать функцию, явно устанавливая this.
// Синтаксис:
func.call(context, arg1, arg2, ...)

// Метод call() вызывает функцию с указанным значением this и индивидуально предоставленными
аргументами.

//     Примечание: хотя синтаксис этой функции практически полностью идентичен функции apply(),
//     фундаментальное различие между ними заключается в том,
//     что функция call() принимает список аргументов, 
//      в то время, как функция apply() - одиночный массив аргументов.

// Вместо func.call(this, ...arguments) мы могли бы написать func.apply(this, arguments).
// Синтаксис встроенного метода func.apply:

func.apply(context, args)

// Он выполняет func, устанавливая this = context и принимая в качестве списка аргументов
псевдомассив args.
// Единственная разница в синтаксисе между call и apply состоит в том, что call ожидает список
аргументов,
//     в то время как apply принимает псевдомассив.
// Эти два вызова почти эквивалентны:

func.call(context, ...args); // передаёт массив как список с оператором расширения
func.apply(context, args);   // тот же эффект

// Есть только одна небольшая разница:

// Оператор расширения ... позволяет передавать перебираемый объект args в виде списка в call.
// А apply принимает только псевдомассив args.
// Так что эти вызовы дополняют друг друга. Для перебираемых объектов сработает call, а где мы
ожидаем псевдомассив – apply.

// А если у нас объект, который и то, и другое, например, реальный массив, то технически мы могли
бы использовать любой метод,
// но apply, вероятно, будет быстрее, потому что большинство движков JavaScript внутренне
оптимизируют его лучше.

// Передача всех аргументов вместе с контекстом другой функции называется «перенаправлением
 вызова» (call forwarding).
// Простейший вид такого перенаправления:

let wrapper = function() {
  return func.apply(this, arguments);
};

// При вызове wrapper из внешнего кода его не отличить от вызова исходной функции.


// ==========================================================================================
=====================================












Итого
Типовой код для GET-запроса при помощи XMLHttpRequest:

var xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url', true);

xhr.send();

xhr.onreadystatechange = function() {
  if (this.readyState != 4) return;

  // по окончании запроса доступны:
  // status, statusText
  // responseText, responseXML (при content-type: text/xml)

  if (this.status != 200) {
    // обработать ошибку
    alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
    return;
  }

  // получить результат из this.responseText или this.responseXML
}
Мы разобрали следующие методы XMLHttpRequest:

open(method, url, async, user, password)
send(body)
abort()
setRequestHeader(name, value)
getResponseHeader(name)
getAllResponseHeaders()
Свойства XMLHttpRequest:

timeout
responseText
responseXML
status
statusText
События:

onreadystatechange
ontimeout
onerror
onload
onprogress
onabort
onloadstart
onloadend

xhr.onload = function() {
  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
  } else { // если всё прошло гладко, выводим результат
    alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
  }
};

----------------Кросс-браузерно:-----------------------

var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var xhr = new XHR();
Теперь в IE8,9 поддерживаются события onload, onerror и onprogress. Это именно для IE8,9.
Для IE10 обычный XMLHttpRequest уже является полноценным.













=============   PROMISE   =========

//

let del3000ms = new Promise(function (ok, fail) {
    setTimeout(() => ok("vse super"), 3000);
});

//

del3000ms
    .then((res) => res.toUpperCase())
    .then(
        (res2) => console.log(res2),
        (err) => console.log("Uuuups")
    );

//

let delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

delay(1000)
    .then(() => console.log("wait"))
    .then(() => delay(2000))
    .then(() => console.log("wait twice"));

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // переведёт промис в состояние fulfilled с результатом "result"
        resolve("result1111");
    }, 3000);
});

// promise.then навешивает обработчики на успешный результат или ошибку
promise.then(
    (result) => {
        // первая функция-обработчик - запустится при вызове resolve
        alert("Fulfilled: " + result); // result - аргумент resolve
    },
    (error) => {
        // вторая функция - запустится при вызове reject
        alert("Rejected: " + error); // error - аргумент reject
    }
);

====================================================================================
====================================================================================
====================================================================================
====================================================================================
====================================================================================
====================================================================================
====================================================================================
====================================================================================
====================================================================================
====================================================================================
====================================================================================

let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* дескриптор свойства:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

Чтобы изменить флаги, мы можем использовать метод Object.defineProperty.

Его синтаксис:

Object.defineProperty(obj, propertyName, descriptor)
obj, propertyName
Объект и его свойство, для которого нужно применить дескриптор.
descriptor
Применяемый дескриптор.
Если свойство существует, defineProperty обновит его флаги. В противном случае метод
создаёт новое свойство с указанным значением и флагами; если какой-либо флаг не указан явно,
ему присваивается значение false.

Object.defineProperty(user, "name", {
  writable: false
});

Теперь никто не сможет изменить имя пользователя, если только не обновит соответствующий флаг
новым вызовом defineProperty.

Ошибки появляются только в строгом режиме
В нестрогом режиме, без use strict, мы не увидим никаких ошибок при записи в свойства
«только для чтения» и т.п. Но эти операции всё равно не будут выполнены успешно.
Действия, нарушающие ограничения флагов, в нестрогом режиме просто молча игнорируются.

Определение свойства как неконфигурируемого – это дорога в один конец.
Мы не сможем отменить это действие, потому что defineProperty не работает
с неконфигурируемыми свойствами.


Object.getOwnPropertyDescriptors
Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом
Object.getOwnPropertyDescriptors(obj).

Вместе с Object.defineProperties этот метод можно использовать для клонирования
объекта вместе с его флагами:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
Обычно при клонировании объекта мы используем присваивание, чтобы скопировать его свойства:

for (let key in user) {
  clone[key] = user[key]
}
…Но это не копирует флаги. Так что если нам нужен клон «получше», предпочтительнее и
спользовать Object.defineProperties.

Другое отличие в том, что for..in игнорирует символьные свойства,
а Object.getOwnPropertyDescriptors возвращает дескрипторы всех свойств, включая свойства-символы.

Глобальное запечатывание объекта
Дескрипторы свойств работают на уровне конкретных свойств.

Но ещё есть методы, которые ограничивают доступ ко всему объекту:

Object.preventExtensions(obj)
Запрещает добавлять новые свойства в объект.
Object.seal(obj)
Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.
Object.freeze(obj)
Запрещает добавлять/удалять/изменять свойства.
Устанавливает configurable: false, writable: false для всех существующих свойств.
А также есть методы для их проверки:

Object.isExtensible(obj)
Возвращает false, если добавление свойств запрещено, иначе true.
Object.isSealed(obj)
Возвращает true, если добавление/удаление свойств запрещено и для всех существующих
свойств установлено configurable: false.
Object.isFrozen(obj)
Возвращает true, если добавление/удаление/изменение свойств запрещено,
и для всех текущих свойств установлено configurable: false, writable: false.
На практике эти методы используются редко.


Итого
Чтобы унаследовать от класса: class Child extends Parent:
При этом Child.prototype.__proto__ будет равен Parent.prototype, так что методы будут унаследованы.
При переопределении конструктора:
Обязателен вызов конструктора родителя super() в конструкторе Child до обращения к this.
При переопределении другого метода:
Мы можем вызвать super.method() в методе Child для обращения к методу родителя Parent.
Внутренние детали:
Методы запоминают свой объект во внутреннем свойстве [[HomeObject]]. Благодаря этому работает super,
он в его прототипе ищет родительские методы.
Поэтому копировать метод, использующий super, между разными объектами небезопасно.
Также:

У функций-стрелок нет своего this и super, поэтому они «прозрачно» встраиваются во внешний контекст.