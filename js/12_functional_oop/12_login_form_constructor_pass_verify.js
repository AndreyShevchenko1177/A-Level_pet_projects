// LoginForm Constructor
// оформите предыдущую задачу как функцию - конструктор.
// Продумайте и предусмотрите геттеры, сеттеры и колбэки.
// Password Verify
// С помощью Password сделайте пару инпутов, которые проверяют введеный пароль (в двух полях ввода) на совпадение. Кнопка должна активизироваться при совпадающих паролях. При открытом пароле второе поле вводы должно пропадать с экрана Таким образом:
// Когда Password в скрытом режиме - появляется второй инпут (<input type='password'>) с паролем в скрытом режиме
// Когда Password в открытом режиме - второй инпут пропадат
function LoginForm() {
    this.inputField = function (parent, open) {
        let inpWrapper = document.createElement("div");
        // parent.append(inpWrapper);

        let inpEl = document.createElement("input");
        inpEl.setAttribute("type", open ? "text" : "password");
        inpEl.setAttribute("placeholder", open ? "Login" : "Password");
        inpEl.setAttribute("style", "margin: 5px");

        inpWrapper.append(inpEl);

        return inpWrapper;
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

    formEl.insertAdjacentHTML("beforeEnd", "LoginForm<br>");
    wrapper.append(formEl);

    let loginEl = this.inputField(formEl, true);
    formEl.append(loginEl);
    let passEl_1 = this.inputField(formEl, false);
    formEl.append(passEl_1);
    let passEl_2 = this.inputField(formEl, false);
    formEl.append(passEl_2);

    // //

    //

    return wrapper;
}

let newLoginForm = new LoginForm();
document.body.append(newLoginForm);
