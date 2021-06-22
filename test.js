function Password(parent, open = false) {
    let inpPass = document.createElement("input");
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    if (open) checkBox.setAttribute("checked", "checked");
    let text = document.createElement("span");
    text.innerText = "view";

    this.setValue = function (value) {
        inpPass.value = value;
    };

    this.getValue = function () {
        return inpPass.value;
    };

    var test = () => (checkBox.checked ? (inpPass.type = "text") : (inpPass.type = "password"));

    this.setOpen = function () {
        checkBox.checked;
        test();
    };

    this.getOpen = function () {
        return checkBox.checked;
    };

    inpPass.oninput = () => {
        this.onChange();
    };

    checkBox.onclick = () => {
        test();
        this.onOpenChange(checkBox.checked);
    };

    parent.append(inpPass);
    parent.append(checkBox);
    parent.append(text);
}

let p = new Password(document.body, true);

p.onOpenChange = (open) => console.log(open);

var list = [
    ["USA", "Mexico"],
    ["Green", "Red", "Blue"],
    ["Metall", "Glass", "Plastic"],
];
var tree = [];

list.forEach(function (listArrayValue, listKey) {
    let secondListKeyElement = 1;
    if (listKey === 0) {
        addElementsToSecondBranch(list, tree, secondListKeyElement, listArrayValue);
    }
});

function addElementsToSecondBranch(list, tree, secondListKeyElement, listArrayValue) {
    listArrayValue.forEach(function (branchKey) {
        tree[branchKey] = [];
        if (typeof tree[branchKey] !== "undefined" && typeof list[secondListKeyElement] !== "undefined") {
            addElementsToSecondBranch(list, tree[branchKey], secondListKeyElement + 1, list[secondListKeyElement]);
        }
    });
}
console.log(tree);
