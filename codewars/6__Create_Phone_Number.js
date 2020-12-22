function createPhoneNumber(numbers = []) {
    let str = "(";
    str += numbers.slice(0, 3).join("") + ") ";
    str += numbers.slice(3, 6).join("") + "-";
    str += numbers.slice(6).join("");
    return str;
}
