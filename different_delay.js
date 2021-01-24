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
    .then((ms) => console.log("wait " + ms))
    .then(() => delay(2000))
    .then((ms) => console.log("wait twice " + ms));

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

let delay2 = function (time) {
    return new Promise(function (resolve, reject) {
        //можно без reject
        console.log("delay starting");
        setTimeout(() => resolve("It past " + time), time);
    });
};

Promise.race([
    delay2(() => console.log("delay end"), 250),
    myfetch("https://swapi.dev/api/people/1/").then((luke) => console.log(luke)),
]);
