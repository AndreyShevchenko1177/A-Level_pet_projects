
// a
// Напишите функцию a, которая просто является коротким именем для alert.

// интересно, а такой вариант решения прокатит?:
// a = alert;
// The End.

function a(message) {
    var res = alert(message)
    return res
}

a(`Привет!\n` + a)





// cube
// Напишите функцию cube, которая возвращает число в третьей степени:


const cube = function (toCube) {
    var cubeIs = toCube * toCube * toCube;
    return cubeIs
};

alert(`Your number in cube iz: ` + cube(+prompt("Input number:")));




// avg2
// Напишите функцию avg2, которая рассчитывает среднюю для двух чисел:

// const avg2 = ([a = 0, b = 0]) => (a + (b || a)) / 2;

// alert(`The mean is: ` + avg2((prompt(`Введите два числа через пробел:`) || "0").split(' ').filter(a => !isNaN(a)).map(a => +a)));


const avg2 = () => {
    [a = 0, b = 0] = (prompt(`Введите два числа через пробел:`) || "0").split(' ').filter(a => !isNaN(a)).map(a => +a);
    return (a + (b || a)) / 2;
};

alert(`The mean is: ` + avg2());