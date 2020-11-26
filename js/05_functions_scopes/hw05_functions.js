
// a
// Напишите функцию a, которая просто является коротким именем для alert.

// интересно, а такой вариант решения прокатит?:
// a = alert;
// The End.

function a(message) {
    var res = alert(message)
    return res
};





// cube
// Напишите функцию cube, которая возвращает число в третьей степени:

const cube = function (toCube) {
    var cubeIs = toCube * toCube * toCube;   //  Math.pow(toCube, 3);
    return cubeIs
};






// avg2
// Напишите функцию avg2, которая рассчитывает среднюю для двух чисел:

// const avg2 = ([a = 0, b = 0]) => (a + b) / 2;
// alert(`The mean is: ` + avg2((prompt(`Введите два числа через пробел:`) || "0").split(' ').filter(a => !isNaN(a)).map(a => +a)));

const avg2 = () => {
    [x1 = 0, x2 = 0] = (prompt(`Введите два числа через пробел:`) || "0").split(' ').filter(a => !isNaN(a)).map(a => +a);
    return (x1 + (x2 || x1)) / 2;
};





//  sum3
// Напишите функцию sum3 для суммирования 3 чисел:
// Обратите внимание, что sum3 от двух параметров тоже работает корректно.

// Если просто без заморочек
// const sum3 = (x1 = 0, x2 = 0, x3 = 0) => +x1 + +x2 + +x3;

function inpNumberArr() {
    var term = [];
    var inp;

    do {
        inp = prompt("Вводите числа пока не надоест.\nМы их все просуммируем");
        if (!isNaN(+inp) && inp !== null) { term.push(+inp) };
    } while (!isNaN(+inp) && inp !== null);
    return term;
}

function arrSum(arr) { return arr.reduce((ar1, ar2) => ar1 + ar2) }





// intRandom
// Напишите функцию intRandom, которая принимает два параметра: нижнюю и верхнюю границу,
// и возвращает целое случайное число из этого диапазона включительно:
// Обратите внимание, что если передан один параметр (intRandom(10) в примере выше),
// то функция работает как будто первый параметр равен 0,
// а переданный параметр становится вторым параметром(intRandom(0, 10))
// Используйте умножение для расширения значения встроенной функции Math.random c диапозона 1,
// сложениe для смещения результата на первый параметр, и Math.round для округления результата

const intRandom = function (...sumArr) {

    for (let i = 0; i < 2; i++) { if (!(i in sumArr)) sumArr[i] = 0 };
    if ((sumArr[0] === 0) && (sumArr[1] === 0)) sumArr[1] = 1;
    // теперь при вызове функции вообще без параметров будет работать просто как random 0/1

    sumArr.sort((a, b) => a - b);
    return sumArr[0] + Math.round(Math.random() * (sumArr[1] - sumArr[0]));
};






// greetAll
// Сделайтей функцию, которая приветствует всех, кто передан в качестве параметров.
// Вам поможет arguments и for

function greetAll() {
    all = '';
    for (item of arguments) all += ' ' + item + ",";
    all = all.slice(0, -1);
    if (all) {
        console.log(`Hi,${all}!`);
        alert(`Hi,${all}!`);
    }
}





// sum
// Напишите функцию sum, которая сумирует любое количество параметров:
// Используйте псевдомассив arguments для получения всех параметров,
// и for для итерирования по нему

function sum() {
    var total = 0;
    for (let item of arguments) { total += +item };
    return total;
}




//--------------------- UNION ---------------------------
// Union
// Всё предыдущие функции и примеры с ними объедините в функции,
// которые вызывайте в switch по имени задания:

let taskList = (`
a_alert
cube
avg2
sum3
intRandom
greetAll
sum
`)

function hw05_functions_union(task = (prompt("Введите название задания:\n" + taskList, '') || "0").toLowerCase()) {

    switch (task) {

        case "0": { ; }; break;


        case "a_alert": {
            a(`Привет!\n` + a);
        }; break;


        case "cube": {
            alert(`Your number in cube iz: ` + cube(+prompt("Input number:")));
        }; break;


        case "avg2": {
            alert(`The mean is: ` + avg2());
        }; break;


        case "sum3": {
            alert('Сумма всех чисел = ' + arrSum(inpNumberArr()));
        }; break;


        case "intrandom": {
            alert(`Случайноее число в диапазоне {2,3} ${intRandom(2, 3)}`);
            console.log(`Случайноее число в диапазоне {2,3} ${intRandom(2, 3)}`)
            //результат может быть и не такой как в предыдущей строке alert)))


            alert(`Случайноее число в диапазоне {1,-2} ${intRandom(1, -2)}`);
            console.log(`Случайноее число в диапазоне {1,-2} ${intRandom(1, -2)}`)


            alert(`Случайноее число в диапазоне {3} ${intRandom(3)}`);
            console.log(`Случайноее число в диапазоне {3} ${intRandom(3)}`)

            alert(`Случайноее число в диапазоне {} ${intRandom()}`);
            console.log(`Случайноее число в диапазоне {} ${intRandom()}`);
        }; break;


        case "greetall": {
            greetAll("Superman")
            greetAll("Superman", "SpiderMan")
            greetAll("Superman", "SpiderMan", "Captain Obvious")
        }; break;


        case "sum": {
            alert(`1+2+3+4 = ` + sum(1, 2, 3, 4));
        }; break;


        default: alert('Такой задачи нет')
    }
};




//--------------------- UNION Declarative---------------------------
// Union declarative
// Используйте ассоциативный массив вместо switch


unDeclObg = {

    byby: () => alert('Byby...'),

    a_alert: () => a(`Привет!\n` + a),

    cube: () => alert(`Your number in cube iz: ` + cube(+prompt("Input number:"))),

    avg2: () => alert(`The mean is: ` + avg2()),

    sum3: () => alert('Сумма всех чисел = ' + arrSum(inpNumberArr())),

    intrandom: () => {
        alert(`Случайноее число в диапазоне {2,3} ${intRandom(2, 3)}`);
        console.log(`Случайноее число в диапазоне {2,3} ${intRandom(2, 3)}`)
        //результат может быть и не такой как в предыдущей строке alert)))


        alert(`Случайноее число в диапазоне {1,-2} ${intRandom(1, -2)}`);
        console.log(`Случайноее число в диапазоне {1,-2} ${intRandom(1, -2)}`)


        alert(`Случайноее число в диапазоне {3} ${intRandom(3)}`);
        console.log(`Случайноее число в диапазоне {3} ${intRandom(3)}`)

        alert(`Случайноее число в диапазоне {} ${intRandom()}`);
        console.log(`Случайноее число в диапазоне {} ${intRandom()}`);
    },

    greetall: function () {
        greetAll("Superman")
        greetAll("Superman", "SpiderMan")
        greetAll("Superman", "SpiderMan", "Captain Obvious")
    },


    sum: () => alert(`1+2+3+4 = ` + sum(1, 2, 3, 4)),

    init() {
        try {
            this[(prompt("Введите название задания:\n" + taskList, 'byby').toLowerCase())]();
        } catch (exept) {
            unDeclObg.byby()
            // console.log(exept)
        }

    },

}




