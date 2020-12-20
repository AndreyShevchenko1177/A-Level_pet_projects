// The goal of this exercise is to convert a string to a new string
// where each character in the new string is "(" if that character appears only once in the original string,
// or ")" if that character appears more than once in the original string.
// Ignore capitalization when determining if a character is a duplicate.

function duplicateEncode(word) {
    let newStr = "";
    word = word.toLowerCase();
    for (let i = 0; i < word.length; i++) {
        if (word.split(word[i]).length > 2) newStr += ")";
        else newStr += "(";
    }
    return newStr;
}
