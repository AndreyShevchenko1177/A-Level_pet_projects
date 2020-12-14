// Password
// function Password(parent, open){

//     .....
// }

// let p = new Password(document.body, true)

// p.onChange = data => console.log(data)
// p.onOpenChange = open => console.log(open)

// p.setValue('qwerty')
// console.log(p.getValue())

// p.setOpen(false)
// console.log(p.getOpen())
// Напишите функцию конструктор Password, которая будет в родительском элементе создавать поле ввода
// для пароля и кнопку / иконку / чекбокс, который будет переключать режим просмотра пароля в поле ввода.
// Параметры:
// parent - родительский элемент
// open - стартовое состояние
// Методы:
// setValue/getValue - задают/читают значения
// setOpen/getOpen - задают/читают открытость текста в поле ввода
// Колбэки (функции обратного вызова, данные изнутри объекта):
// onChange - запускается по событию oninput в поле ввода, передает текст наружу
// onOpenChange - запускается по изменению состояния открытости пароля

function Password(parent, open = false) {
    let inpEl = document.createElement("input");
    inpEl.setAttribute("type", open ? "text" : "password");
    inpEl.oninput = () => {
        this.onChange(this.getValue());
    };

    let checkEl = document.createElement("input");
    checkEl.setAttribute("type", "checkbox");
    if (open) checkEl.setAttribute("checked", "checked");

    const check = function () {
        if (checkEl.checked) {
            inpEl.setAttribute("type", "text");
        } else inpEl.setAttribute("type", "password");
    };

    checkEl.onclick = () => {
        check();
        this.onOpenChange(checkEl.checked);
    };

    let descriptionEl = document.createElement("span");
    descriptionEl.append(`- посмотреть пароль.   Родительский элемент: ${parent.tagName}, id="${parent.id}"`);

    parent.append(inpEl);
    parent.append(checkEl);
    parent.append(descriptionEl);

    // .....методы

    this.setValue = function (value) {
        inpEl.value = value;
    };

    this.getValue = function () {
        if (!checkEl.checked) {
            //
            // это ради шутки (ну и, конечно же, для тренировки)))

            let arr = new Array(inpEl.value.length + 1);
            return arr.join("*");
        }

        return inpEl.value;
    };

    this.setOpen = function (isOpen) {
        checkEl.checked = isOpen;
        check.call(this);
    };

    this.getOpen = function () {
        return checkEl.checked;
    };

    this.onChange = () => {};
    this.onOpenChange = () => {};
}

let p1 = new Password(divFirst, true);
let p2 = new Password(divSecond, false);
let p = new Password(document.body, true);

p.onChange = (data) => console.log(data);
p.onOpenChange = (open) => console.log(open);
p2.onOpenChange = (open) => console.log(open);

p.setValue("qwerty");
console.log(`Значение поля  ${p.getValue()}`);

p.setOpen(false);
console.log(`Значение поля  ${p.getValue()}`);
console.log(`чек/не чек   ${p.getOpen()}`);

//

// LoginForm
// С помощью предыдущего кода Password сделайте форму логина, кнопка в которой будет активна
// только если и login и пароль не пусты

let loginForm = document.createElement("div");
// loginForm.setAttribute("id", "loginForm");
loginForm.setAttribute("style", "height: 70px; border: 5px solid limegreen; margin: 10px");
document.body.append(loginForm);

let inp = new Password(loginForm, true);
loginForm.querySelector("span").remove();
loginForm.querySelector(`input[type="checkbox"]`).remove();
loginForm.querySelector(`input`).setAttribute("placeholder", "Login");
// loginForm.querySelector(`input`).setAttribute("id", "loginId");

let pass = new Password(loginForm, false);
loginForm.querySelector(`input:nth-child(2)`).setAttribute("placeholder", "Password");
// loginForm.querySelector(`input:nth-child(2)`).setAttribute("id", "passId");
// loginForm.querySelector(`input:nth-child(3)`).setAttribute("id", "checkId");

loginForm.insertAdjacentHTML("beforeEnd", "<br>");

let btnLogin = document.createElement("button");
// btnLogin.setAttribute("id", "btnLogin1");
btnLogin.setAttribute("disabled", "disabled");
btnLogin.append("Login");
loginForm.append(btnLogin);

inp.onChange = pass.onChange = () => {
    if (inp.getValue() && pass.getValue()) {
        btnLogin.removeAttribute("disabled");
    } else btnLogin.setAttribute("disabled", "disabled");
};
