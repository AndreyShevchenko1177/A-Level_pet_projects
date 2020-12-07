let a = [1, 2, 3, 4, 5];

let f = (x) => x * x;

var myMap = function (arr, func) {
    let arrTemp = [];
    for (item of arr) {
        arrTemp.push(func(item));
    }
    return arrTemp;
};

myMap(a, f);
console.log(myMap(a, f));

//-----------------------------

let b = [3, -2, 50, 0, 33];

let ff = (x) => x > 10;

var myFilter = function (arr, func) {
    let arrTemp = [];
    for (item of arr)
        if (func(item)) {
            arrTemp.push(item);
        }
    return arrTemp;
};

let bb = myFilter(b, ff);
console.log(bb);

//-----------------------------

let b = [1, 2, 3, 4];

let rr = (a, b) => a + b;

var myReduce = function (arr, func) {
    for (i = 1; i < arr.length; i++) {
        arr[i] = func(arr[i - 1], arr[i]);
    }
    return arr[arr.length - 1];
};

console.log(myReduce(b, rr));
