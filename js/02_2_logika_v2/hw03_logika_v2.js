
let taskList = (`
switch: sizes
switch: if
prompt: or
confirm: or this days
confirm: if this days
triple prompt
default: or
default: if
login and password
currency calc
scissors
`)

function hw03_logika_v2() {
    debugger;
    var task = (prompt("Что, новый хозяин, надо???" + taskList, "Напечь за меня пирогов!").toLowerCase());
    alert(task);
    switch (task) {
        case "switch: sizes": { ; };
        //     case "switch: if": { ; };
        //     case "prompt: or": { ; };
        //     case "confirm: or this days": { ; };
        //     case "confirm: if this days": { ; };
        //     case "triple prompt": { ; };
        //     case "default: or": { ; };
        //     case "default: if": { ; };
        //     case "login and password": { ; };
        //     case "currency calc": { ; };
        //     case "scissors": { ; };
        default: { alert("Такого мы не умеем...") };
    }
}