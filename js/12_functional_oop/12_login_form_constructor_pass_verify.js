// LoginForm Constructor
// оформите предыдущую задачу как функцию - конструктор.
// Продумайте и предусмотрите геттеры, сеттеры и колбэки.
// Password Verify
// С помощью Password сделайте пару инпутов, которые проверяют введеный пароль (в двух полях ввода) на совпадение. Кнопка должна активизироваться при совпадающих паролях. При открытом пароле второе поле вводы должно пропадать с экрана Таким образом:
// Когда Password в скрытом режиме - появляется второй инпут (<input type='password'>) с паролем в скрытом режиме
// Когда Password в открытом режиме - второй инпут пропадат

function LoginForm(parentMain) {
    inputField = function (parent, open) {
        inpWrapper = document.createElement("div");
        let inpEl = document.createElement("input");
        inpEl.setAttribute("type", open ? "text" : "password");
        inpEl.setAttribute("placeholder", open ? "Login" : "Password");
        inpEl.setAttribute("style", "margin: 5px");
        inpWrapper.append(inpEl);
        parent.append(inpWrapper);
        return inpEl;
    };

    let wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "space-around";

    let formEl = document.createElement("div");
    formEl.setAttribute("id", "formLoginPass");
    formEl.setAttribute("style", "border: 2px solid darkblue; background-color: lightsteelblue;");
    formEl.style.minHeight = "50px";
    formEl.style.borderRadius = "10px";
    formEl.style.padding = "10px";
    formEl.style.display = "flex";
    formEl.style.flexDirection = "column";
    formEl.style.alignItems = "center";
    formEl.style.justifyContent = "space-around";

    formEl.insertAdjacentHTML("beforeEnd", "Registration<br>");
    wrapper.append(formEl);

    loginEl = inputField(formEl, true);

    passEl_1 = inputField(formEl, false);
    formEl.append(passEl_1);

    passEl_2 = inputField(formEl, false);
    passEl_2.setAttribute("placeholder", "Repeat password");
    passEl_2.parentElement.setAttribute("style", "min-height: 35px;");

    checkEl = inputField(formEl, false);
    checkEl.setAttribute("type", "checkbox");
    checkEl.parentElement.append("See password");

    let btnSend = document.createElement("button");
    btnSend.append("Login");
    btnSend.setAttribute("disabled", "disabled");
    formEl.append(btnSend);

    const doSwitchButton = function (obj) {
        if (!!obj.user && !!obj.pas1 && ("pas2" in obj ? obj.pas1 == obj.pas2 : true)) {
            btnSend.removeAttribute("disabled");
        } else {
            btnSend.setAttribute("disabled", "disabled");
        }
    };

    const check = function () {
        if (checkEl.checked) {
            passEl_1.setAttribute("type", "text");
            passEl_2.style.display = "none";
        } else {
            passEl_1.setAttribute("type", "password");
            passEl_2.style.display = "";
            passEl_2.value = "";
        }
        loginEl.oninput();
    };

    checkEl.onclick = () => check.call(this);

    loginEl.oninput = passEl_1.oninput = passEl_2.oninput = () => {
        if (this.onChangeInForm) this.onChangeInForm();
        let obj = {
            user: loginEl.value,
            pas1: passEl_1.value,
        };
        if (!checkEl.checked) obj.pas2 = passEl_2.value;
        console.log(obj);
        doSwitchButton(obj);
        // + можно проверить валидность данных
    };

    btnSend.onclick = () => {
        let sendObj = {};
        sendObj[loginEl.value] = passEl_1.value;
        console.log(JSON.stringify(sendObj));
        alert(`Вы успешно зарегистрированы.\nЛогин: ${loginEl.value}\nПароль: ${passEl_1.value}`);
    };

    //

    // ------ методы -------

    //

    this.loginSet = function (data) {
        loginEl.value = data;
        loginEl.oninput();
    };

    this.passSet = function (data) {
        passEl_1.value = data;
        passEl_2.value = data;
        loginEl.oninput();
    };

    this.getLogin = function () {
        return loginEl.value;
    };

    this.getPass1 = function () {
        // не уверен можно ли делать такие геттеры в плане безопасности (секретности) данных
        return passEl_1.value;
    };

    this.getPass2 = function () {
        return passEl_2.value;
    };

    this.onChangeInForm = () => {};

    parentMain.append(wrapper);
} // function LoginForm()

//

//

let fff = new LoginForm(document.body);

fff.loginSet("Qwerty");
fff.passSet("123");
console.log("Сейчас установлен логин: " + fff.getLogin());
console.log("Сейчас установлен пароль1: " + fff.getPass1());
console.log("Сейчас установлен пароль2: " + fff.getPass2());
