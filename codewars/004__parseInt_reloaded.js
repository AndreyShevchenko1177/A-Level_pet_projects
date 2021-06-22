function parseInt(string) {
    // TODO: it's your task now
    let namSet = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
        'twenty': 20,
        'thirty': 30,
        'forty': 40,
        'fifty': 50,
        'sixty': 60,
        'seventy': 70,
        'eighty': 80,
        'ninety': 90,
    };

    let num = 0, n = '', flag = false, rest = 0;

    string = string.toLowerCase();
    string = string.replace(/ +/g, " ");
    string = string.replace(/-+/g, " ");
    string = string.trim().split(' ');
    // console.log(string);

    while (string[0]) {
        n = string.shift();

        switch (n) {
            case 'and': {
                break;
            };
            case 'hundred': {
                if (flag) {
                    rest = num % 100;
                    num = Math.trunc(num / 100) + rest;
                } else {
                    flag = true;
                }
                num *= 100;
                break;
            };
            case 'thousand': {
                if (flag) {
                    rest = num % 1000;
                    num = Math.trunc(num / 1000) + rest;
                } else {
                    flag = true;
                }
                num *= 1000;
                break;
            };
            case 'million': {
                num *= 1000000;
                flag = true;
                break;
            };
            default: {
                num += namSet[n];
                break;
            };
        }

    };

    return (num);
}

console.log(parseInt('one thousand three hundred and thirty seven'));
console.log(parseInt('twenty six thousand three hundred and fifty-nine'));
console.log(parseInt('forty-two thousand two hundred ninety-three'));
console.log(parseInt("seven hundred eighty-three thousand nine hundred and nineteen"));
