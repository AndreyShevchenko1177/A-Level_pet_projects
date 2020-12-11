let wrapper = function (func, ...bondArg) {};
return function (...arg) {
    return func.call(this, ...bondArg, ...arg);
};

//

//

let mult = function (a, b) {
    return a + b;
};

let plus2 = mult.bind(null, 2);

plus2(5);

// let mult = mult.bind(null, 2);

mult(5); // ==7

// let plus2 = mult.bind(null, 2);

mult(5); // ==4

//
