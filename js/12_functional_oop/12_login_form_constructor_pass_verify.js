// LoginForm Constructor
// оформите предыдущую задачу как функцию - конструктор.
// Продумайте и предусмотрите геттеры, сеттеры и колбэки.
// Password Verify
// С помощью Password сделайте пару инпутов, которые проверяют введеный пароль (в двух полях ввода) на совпадение. Кнопка должна активизироваться при совпадающих паролях. При открытом пароле второе поле вводы должно пропадать с экрана Таким образом:
// Когда Password в скрытом режиме - появляется второй инпут (<input type='password'>) с паролем в скрытом режиме
// Когда Password в открытом режиме - второй инпут пропадат

function InputField(parent, open = false) {
    inpWrapper = document.createElement("div");
    this.inpEl = document.createElement("input");
    this.inpEl.setAttribute("type", open ? "text" : "password");
    this.inpEl.setAttribute("placeholder", open ? "Login" : "Password");
    this.inpEl.setAttribute("style", "margin: 5px");
    inpWrapper.append(this.inpEl);
    parent.append(inpWrapper);
    return this.inpEl;
}

function LoginForm(parentMain) {
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

    let loginEl = new InputField(formEl, true);

    let passEl_1 = new InputField(formEl, false);

    let passEl_2 = new InputField(formEl, false);
    passEl_2.setAttribute("placeholder", "Repeat password");
    passEl_2.parentElement.setAttribute("style", "min-height: 35px;");

    let checkEl = new InputField(formEl, false);
    checkEl.setAttribute("type", "checkbox");
    checkEl.parentElement.append("See password");

    let btnSend = document.createElement("button");
    btnSend.append("Login");
    btnSend.setAttribute("disabled", "disabled");
    formEl.append(btnSend);

    formEl.addEventListener("keydown", function (e) {
        if (e.key == "Enter") sendDataOutside();
    });

    const doSwitchButton = function (obj) {
        if (!!obj.user && !!obj.pas1 && ("pas2" in obj ? obj.pas1 == obj.pas2 : true)) {
            btnSend.removeAttribute("disabled");
        } else {
            btnSend.setAttribute("disabled", "disabled");
        }
    };

    checkEl.onclick = (isUser = true) => {
        if (checkEl.checked) {
            passEl_1.setAttribute("type", "text");
            passEl_2.style.display = "none";
        } else {
            passEl_1.setAttribute("type", "password");
            passEl_2.style.display = "";
            passEl_2.value = "";
        }
        loginEl.oninput(isUser);
    };

    loginEl.oninput = passEl_1.oninput = passEl_2.oninput = (isUser = true) => {
        let obj = {
            user: loginEl.value,
            pas1: passEl_1.value,
        };
        if (!checkEl.checked) obj.pas2 = passEl_2.value;
        doSwitchButton(obj); // + можно проверить валидность данных

        // запуск колбека если изменения были внесены пользователем
        if (isUser && this.onChangeInForm && typeof this.onChangeInForm === "function") this.onChangeInForm();
    };

    const sendDataOutside = function () {
        loginEl.oninput();
        if (btnSend.getAttribute("disabled") !== "disabled") {
            let sendObj = {};
            sendObj[loginEl.value] = passEl_1.value;
            console.log(JSON.stringify(sendObj));
            alert(`Вы успешно зарегистрированы.\nЛогин: ${loginEl.value}\nПароль: ${passEl_1.value}`);
        }
    };

    btnSend.onclick = () => sendDataOutside.call(this);

    //

    // ------ методы -------

    //

    this.setLogin = function (data) {
        loginEl.value = data;
        loginEl.oninput(false);
        // false - не надо никого ни о чем информировать - это код вносит изменения а не пользователь
    };

    this.setPass = function (data) {
        passEl_1.value = data;
        passEl_2.value = data;
        loginEl.oninput(false);
        // false - не надо никого ни о чем информировать - это код вносит изменения а не пользователь
    };

    this.setSeeStatus = function (status = false) {
        checkEl.checked = status;
        checkEl.onclick(false);
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

    this.getSeeStatus = function () {
        return checkEl.checked;
    };

    this.onChangeInForm = () => {};

    parentMain.append(wrapper);
} // function LoginForm()

//

//

let registrationForm = new LoginForm(document.body);

registrationForm.setLogin("Qwerty");
registrationForm.setPass("123");
console.log("Сейчас установлен логин: " + registrationForm.getLogin());
console.log("Сейчас установлен пароль1: " + registrationForm.getPass1());
console.log("Сейчас установлен пароль2: " + registrationForm.getPass2());

registrationForm.onChangeInForm = (data = "В форме произошли изменения") => console.log(data);
