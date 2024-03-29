//======================================================

// makeProfileTimer
// Напишите функцию makeProfileTimer, которая служит для замера времени выполнения другого

makeProfileTimer = function () {
    let t1 = performance.now();
    return function () {
        return performance.now() - t1;
    };
};

var timer = makeProfileTimer();
alert("Замеряем время работы этого alert"); //некий код, время выполнения которого мы хотим измерить с высокой точностью
alert(`Время работы кода составило ${timer()} милисекунд`);

//======================================================

//makeSaver
// Напишите функцию makeSaver, которая:
//     var saver = makeSaver(Math.random) //создает функцию-хранилище результата переданной в качестве параметра функции (Math.random
//                                       // в примере). На этом этапе Math.random НЕ вызывается
//     var value1 = saver()              //saver вызывает переданную в makeSaver функцию, запоминает результат и возвращает его
//     var value2 = saver()              //saver в дальнейшем просто хранит результат функции, и более НЕ вызывает переданную
//                                       //в makeSaver функцию;
//     value1 === value2                 // всегда true

//     var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
//     var value3 = saver2()
//     var value4 = saver2()

//     value3 === value4 // тоже должно быть true
// Таким образом makeSaver решает две задачи:
// Навсегда сохраняет результат функции. Это актуально, например, для Math.random.
// Действует лениво, то есть вызывает Math.random только тогда, когда результат действительно нужен.
// Если же по каким - то причинам значение не понадобится, то Math.random даже не будет вызван

const makeSaver = function (func) {
    let isFirst = true;
    let result;
    return function () {
        if (isFirst) {
            result = func();
            console.log(`Запомнили: ${result}`);
            isFirst = false;
        }
        return result;
    };
};

var saver = makeSaver(Math.random);
var value1 = saver();
var value2 = saver();

value1 === value2 ? alert(`value1 === value2   YAHOO!!!`) : alert(`value1 !== value2   :(`);

var saver2 = makeSaver(
    () =>
        console.log("saved function called") ||
        [null, undefined, false, "", 0, Math.random()][Math.ceil(Math.random() * 6)]
);
var value3 = saver2();
var value4 = saver2();

value3 === value4 ? alert(`value3 === value4   YAHOO!!!`) : alert(`value3 !== value4   :(`);

//======================================================

// Final Countdown
// Напишите код, который будет делать обратный ежесекундный отсчёт в консоли, используя console.log.
// Используйте Self Invoked Function для создания замыкания и setTimeout для задержки вывода.

//
//
//   Not Self Invoked

var finalCountdown = function (count) {
    setTimeout(() => console.log(count), 0);
    for (let i = count - 1; i > 0; i--) {
        setTimeout(() => console.log(count - i), i * 1000);
    }
    setTimeout(() => console.log("ПОЕХАЛИ!"), count * 1000);
};

finalCountdown(5);

//
//
//   Self Invoked !!! (не сразу, но сообразил как закрутить, чтобы не ждать в начале дополнительную секунду)

var finalCountdown2 = function (count, i = 0) {
    if (!i) i = count;

    if (count < 0) {
        console.log("Все уже давно закончилось. Вы опоздали...");
        return;
    }

    let msg = !count ? "GO!" : count;
    if (count >= 0) {
        setTimeout(() => console.log(msg), 1000 * (i - count));
        finalCountdown2(count - 1, i);
    }
    return;
};

finalCountdown2(5);

//======================================================

// myBind
// Изучите встроенную функцию bind, и сделайте свою версию,
// которая позволит определить "значение по умолчанию" не только для первых параметров,
// но для любых других, например для степени в Math.pow:
// var pow5 = myBind(Math.pow, Math, [undefined, 5]) // первый параметр - функция для биндинга значений по умолчанию,
//                                                   // второй - this для этой функции, третий - массив, в котором undefined означает
//                                                   // параметры, которые должны передаваться при вызове,
//                                                   // а другие значения являются значениями по умолчанию:
// var cube = myBind(Math.pow, Math, [undefined, 3]) // cube возводит число в куб

// pow5(2) // => 32, вызывает Math.pow(2,5), соотнесите с [undefined, 5]
// cube(3) // => 27

// var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5,undefined, 8,undefined, 9])
// chessMin(-1,-5,3,15) // вызывает Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5

// var zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогично, только теперь задается "0" как текст по умолчанию в prompt,
//                                                           // а текст приглашения пользователя задается при вызове zeroPrompt
// var someNumber = zeroPrompt("Введите число")              // вызывает prompt("Введите число","0")

function myBind(func, tempThis, tempArray) {
    return function (...arguments) {
        let i = 0;
        let newTempArray = tempArray.map((value) => (value === undefined ? arguments[i++] : value));

        return func.call(tempThis, ...newTempArray); //    call || apply - вот в чем вопрос...
    };
}

function myBind_v2(func, tempThis, tempArray) {
    return function (...arguments) {
        let i = 0;
        let newTempArray = tempArray.map((value) => (value === undefined ? arguments[i++] : value));

        return func.apply(tempThis, newTempArray); //    call || apply - вот в чем вопрос...
    };
}

var pow5 = myBind(Math.pow, Math, [undefined, 5]);
var cube = myBind_v2(Math.pow, Math, [undefined, 3]);

debugger;
pow5(2); // => 32, вызывает Math.pow(2,5)
cube(3); // 27

var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5, undefined, 8, undefined, 9]);
chessMin(-1, -5, 3, 15); // вызывает Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5

var zeroPrompt = myBind(prompt, window, [undefined, "0"]);
var someNumber = zeroPrompt("Введите число"); // вызывает prompt("Введите число","0")
