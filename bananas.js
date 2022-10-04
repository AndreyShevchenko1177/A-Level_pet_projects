var bananas = function (s) {
  // Your code here!

  let model = 'aa';
  let modelLength = model.length;

  let sLength = s.length;

  let firstSoch = (((1 << modelLength) - 1) << (sLength - modelLength));
  console.log('---firstSoch - ', firstSoch, ' - ', firstSoch.toString(2));

  let lastSOch = (((1 << modelLength) - 1));
  console.log('---lastSOch - ', lastSOch, ' - ', lastSOch.toString(2));



  let nextSoch = function (a) {

    let res=0;
    // if (a>=lastSOch) {
      // console.log('nextSoch - ', a, ' - ', a.toString(2));
    // }

    let shiftLast1 = function (a) {
      return ((a - 1) ^ ((a ^ (a - 1)) >> 2));
    };

    let add1AfterLast1 = function (a) {
      return (a | (((a ^ (a - 1)) + 1) >> 2));
    };

    if ((a & (a + 1)) == 0)
      return 0;

    if (a & 1) {
      res = add1AfterLast1(nextSoch(a >> 1) << 1);
      console.log('res - ', res.toString(2));
      return res
    } else {
      res = shiftLast1(a)
      if (res.toString(2).length<){}
      console.log('res - ', res.toString(2));
      return shiftLast1(a);
    }
  };

  // let nextS = nextSoch(firstSoch)

  while (firstSoch !== lastSOch) {
    // debugger;
    firstSoch = nextSoch(firstSoch);
  }

  // console.log(nextS.toString(2));




  return [];
};

bananas("aaaa");





// 1) Если самый правый символ "0", то находим среди всех единиц самую правую и сдвигаем её на 1 позицию вправо.

// 2) Если самый правый символ "1", то отрубаем самый правый символ и отправляем полученную комбинацию (длины N-1 с K-1 единицами) на п.1 алгоритма.
// В полученном значении находим самую правую единицу и вписываем вырезанную ранее единицу сразу после неё.



// Операция сдвига вправо самой младшей единицы, с неприкосновенностью более старших разрядов.
let shiftLast1 = function (a) {
  return ((a - 1) ^ ((a ^ (a - 1)) >> 2));
};

// Операция дописывания единицы справа от самой младшей единицы.
let add1AfterLast1 = function (a) {
  return (a | (((a ^ (a - 1)) + 1) >> 2));
};

// метод генерации первой комбинации. K единиц сдвигаются влево на (N-K) позиций.
let firstSoch = function (n, k) {
  console.log((((1 << k) - 1) << (n - k)).toString(2));
  return (((1 << k) - 1) << (n - k));
};

let nextSoch = function (a) {
  // в случае последней комбинации вернём нуль
  if ((a & (a + 1)) == 0)
    return 0;

  if (a & 1)
    return add1AfterLast1(nextSoch(a >> 1) << 1);
  else
    return shiftLast1(a);
};


// let isPossibleFn = function (s) {
  // let model = 'banana';
  // let indModel = 0;
  //   let isPossible = false;
  //   let str = '';

  //   for (let i = 0; i < s.length && indModel < model.length; i++) {
  //     isPossible = false;
  //     if (model[indModel] === s[i]) {
  //       isPossible = true;
  //       str += model[indModel];
  //       indModel++;
  //       continue;
  //     } else {
  //       str += '-';
  //     }
  //   }
  //   console.log(str);
  //   return isPossible;
  // };