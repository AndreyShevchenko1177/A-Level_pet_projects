//
// Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

// moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]

//

var moveZeros = function (arr) {
    let arr1 = [];
    let arr2 = [];
    arr.forEach((el) => {
        el === 0 ? arr2.push(el) : arr1.push(el);
    });
    return [...arr1, ...arr2];
};

moveZeros([1, 2, 0, 1, 0, 1, 0, 3, 0, 1]);
