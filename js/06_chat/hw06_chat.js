const socket = io("http://localhost:4000");
users = []; // кто тут в чате

let nick;
while (!(nick = prompt("Введите свой ник:"))) {}
nickId.value = nick;
socket.emit("msg", {
    nick: nickId.value,
    message: "---Я тут новенький!!!---",
});
nickId.setAttribute("readonly", "readonly");

// отправка сообщения в чат при нажатии Enter в поле ввода сообщения
msgId.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        sendId.onclick();
    }
});

function reciveMsg(msg) {
    debugger;
    console.log(msg);
    if (msg.nick === "--Администрация--") {
        chatWindow.innerHTML += "<br/>" + msg.nick + ":  " + msg.message;
        users.length = 0;
        socket.emit("msg", {
            nick: nickId.value,
            message: "$$_iAm_$$",
        });
    } else if (msg.message !== "$$_iAm_$$") {
        chatWindow.innerHTML += "<br/><b>" + msg.nick + ":</b>  " + msg.message;
    }

    chatWindow.scrollTop = chatWindow.scrollHeight; // прокрутка скрола чата

    if (!~users.indexOf(msg.nick) && msg.nick !== "--Администрация--") {
        users.push(msg.nick);
        users.sort((a, b) => (a < b && -1) || 1);
        whoIsHere.innerHTML = "Кто у нас тут в чате:";
        for (i of users) {
            whoIsHere.innerHTML += "<br/><b>" + i + "</b>";
        }
        // whoIsHere.scrollTop = whoIsHere.scrollHeight;
    }
}

socket.on("msg", (msg) => reciveMsg(msg));

sendId.onclick = () => {
    socket.emit("msg", {
        nick: nickId.value,
        message: msgId.value,
    });
    msgId.value = "";
};
