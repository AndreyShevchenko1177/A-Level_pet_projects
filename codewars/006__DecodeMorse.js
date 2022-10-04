function decode(str) {

    if (!str) return '';
    // implement morse decode here
    let morseSet = {
        '-': "t",
        '--': "m",
        '---': "o",
        '-----': "0",
        '----.': "9",
        '---..': "8",
        '--.': "g",
        '--.-': "q",
        '--..': "z",
        '--...': "7",
        '-.': "n",
        '-.-': "k",
        '-.--': "y",
        '-.-.': "c",
        '-..': "d",
        '-..-': "x",
        '-...': "b",
        '-....': "6",
        '.': "e",
        '.-': "a",
        '.--': "w",
        '.---': "j",
        '.----': "1",
        '.--.': "p",
        '.-.': "r",
        '.-..': "l",
        '..': "i",
        '..-': "u",
        '..---': "2",
        '..-.': "f",
        '...': "s",
        '...-': "v",
        '...--': "3",
        '....': "h",
        '....-': "4",
        ".....": "5",
    };
    // debugger;
    // str = str.replace(/ +/g, " ").trim();
    let arr = str.split(' ');
    str = arr.reduce((a, b) => a += !!b ? morseSet[b] : ' ', '');

    return str;
}
console.log(
    decode(".... . .-.. .-.. ---  .-- --- .-. .-.. -.."));