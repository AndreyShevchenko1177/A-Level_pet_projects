users = [];

// отправка сообщения в чат при нажатии Enter в поле ввода сообщения
msgId.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        sendId.onclick();
    }
});

function reciveMsg(msg) {
    console.log(msg);
    chatWindow.innerHTML += '<br/><b>' + msg.nick + ':</b>  ' + msg.message;
    chatWindow.scrollTop += 100;
    if (!~users.indexOf(msg.nick)) {
        users.push(msg.nick);
        users.sort((a, b) => (a < b) && -1 || 1);
        whoIsHere.innerHTML = 'Кто у нас тут в чате:';
        for (i of users) {
            whoIsHere.innerHTML += '<br/><b>' + i + '</b>';
        }
    }
}

const socket = io("http://localhost:4000");
socket.on("msg", msg => reciveMsg(msg));
sendId.onclick = () => {
    socket.emit("msg", {
        nick: nickId.value,
        message: msgId.value,
    });
    msgId.value = '';
};