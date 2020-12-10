//======================================================

// makeProfileTimer
// Напишите функцию makeProfileTimer, которая служит для замера времени выполнения другого

makeProfileTimer = function () {
    let t1 = performance.now();
    return function () {
        return t1 - performance.now();
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
    let rusult;
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
//   Self Invoked !!! (не сразу, но сообразил как закрутить)

var finalCountdown2 = function (count, i = 0) {
    if (!i) i = count;

    let msg;
    msg = !count ? "GO!" : count;
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
