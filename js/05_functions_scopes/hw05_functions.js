
// a
// Напишите функцию a, которая просто является коротким именем для alert.

// интересно, а такой вариант решения прокатит?:
// a = alert;
// The End.

function a(message) {
    var res = alert(message)
    return res
};

a(`Привет!\n` + a);





// cube
// Напишите функцию cube, которая возвращает число в третьей степени:


const cube = function (toCube) {
    var cubeIs = toCube * toCube * toCube;   //  Math.pow(toCube, 3);
    return cubeIs
};

alert(`Your number in cube iz: ` + cube(+prompt("Input number:")));





// avg2
// Напишите функцию avg2, которая рассчитывает среднюю для двух чисел:

// const avg2 = ([a = 0, b = 0]) => (a + (b || a)) / 2;

// alert(`The mean is: ` + avg2((prompt(`Введите два числа через пробел:`) || "0").split(' ').filter(a => !isNaN(a)).map(a => +a)));


const avg2 = () => {
    [x1 = 0, x2 = 0] = (prompt(`Введите два числа через пробел:`) || "0").split(' ').filter(a => !isNaN(a)).map(a => +a);
    return (x1 + (x2 || x1)) / 2;
};

alert(`The mean is: ` + avg2());





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

alert('Сумма всех чисел = ' + inpNumberArr().reduce((ar1, ar2) => ar1 + ar2));






