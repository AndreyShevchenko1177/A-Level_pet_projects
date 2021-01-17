// Корзина хранится в localstorage для всех пользователей.
// Ключем для доступа к данным корзины конкретного пользователя служит его __id,
// полученный из localStorage.authToken после авторизации.
// Данные корзины для каждого пользователя сбрасываются только в момент покупки.
// Наполнять корзину можно и анонимно. Но оформить этот заказ не получится.
// В случае развития этого проекта можно организовать дополнительную логику для
// анонимной корзины. Например: если после авторизации Ваша корзина из истории
// оказалась пустой, то товары из анонимной корзины попадут в Вашу, но только в случае
// если сессия не прерывалась.
// Но мне кажется, что такая организация корзины - нарушает безопасность личных данных
// и корзина должна быть организована на серверной стороне.

const delay = (ms) => new Promise((res) => setTimeout(() => res(ms), ms));

// localStorage.removeItem("authToken");
// "eyJzdWIiOnsibG9naW4iOiJfX2Fub255bW91c19fIn19"-- - {"sub":{"login": "__anonymous__"}}

const urlConst = "http://shop-roles.asmer.fs.a-level.com.ua";
const defaultLoginName = "__anonymous__";
const defaultLoginId = "0";
let loginName = defaultLoginName;
let loginId = defaultLoginId;
let basketObj = {};
basketObj[defaultLoginId] = {};

goLogin.onclick = () => {
    init();
    loginForm.style.display = "";
};

goLogoff.onclick = () => {
    localStorage.removeItem("authToken");
    loginName = defaultLoginName;
    init();
};

goRegistration.onclick = () => {
    init();
    registrationForm.style.display = "";
};

async function setLoginFromToken() {
    loginName = defaultLoginName;
    loginId = defaultLoginId;
    try {
        loginName = await JSON.parse(atob(localStorage.authToken.split(".")[1])).sub.login;
        loginId = await JSON.parse(atob(localStorage.authToken.split(".")[1])).sub.id;
        updateBasketObj();
    } catch (error) {
        console.log(
            "Ошибка декодирования login из токена / либо пользователь разлогинился: ",
            error
        );
    }
}

const init = function () {
    if (!localStorage.basket) {
        localStorage.basket = JSON.stringify(basketObj);
    } else {
        basketObj = JSON.parse(localStorage.basket);
    }
    registrationForm.style.display = "none";
    loginForm.style.display = "none";
    forImage.style.display = "none";
    forBasket.style.display = "none";
    checkAuthToken();
};

async function checkAuthToken() {
    if (localStorage.authToken) {
        goLogin.style.display = "none";
        goRegistration.style.display = "none";
        goLogoff.style.display = "";
        historyDiv.style.display = "";
        nickNameDiv.style.display = "";
        // setBasketBtnOn();
        await setLoginFromToken();
        nickNameSpan.innerHTML = loginName;
        return true;
    }

    goLogin.style.display = "";
    goRegistration.style.display = "";
    goLogoff.style.display = "none";
    historyDiv.style.display = "none";
    nickNameSpan.innerHTML = defaultLoginName;
    nickNameDiv.style.display = "none";
    // setBasketBtnOff();
    setLoginFromToken();
    return false;
}

async function updateBasketObj() {
    if (!basketObj[loginId]) {
        basketObj[loginId] = {};
    }
    try {
        let temp = await JSON.stringify(basketObj);
        localStorage.basket = temp;
    } catch (error) {
        console.log("Ошибка localStorage.basket = JSON.stringify(basketObj) - ", error);
    }
}

const getGQL = (url) => (query, variables = {}) => {
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(localStorage.authToken
                ? { Authorization: `Bearer ${localStorage.authToken}` }
                : {}),
        },
        body: JSON.stringify({ query, variables }),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const gql = getGQL(urlConst + `/graphql`);

async function categories(parentEl = leftSide, parentID = null) {
    let result = await gql(
        `query categories ($query:String){
            CategoryFind(query:$query){
                _id
                name
            }
        }`,
        { query: JSON.stringify([{ "parent._id": parentID }, { sort: [{ name: 1 }] }]) }
    );
    // console.log(result);
    if (result.errors) return;

    let ul = document.createElement("ul");
    parentEl.append(ul);

    for (let { name, _id } of result.data.CategoryFind) {
        let li = document.createElement("li");
        li.innerText = name;
        li.style.fontWeight = "";

        let loaded;
        li.onclick = (event) => {
            if (event) event.stopPropagation();
            li.parentElement.parentElement.style.fontWeight = "";
            [].forEach.call(li.parentElement.children, (el) => (el.style.fontWeight = ""));
            li.style.fontWeight = "700";

            if (!loaded) {
                categories(li, _id);
                loaded = true;
            } else {
                loaded = false;
                [].forEach.call(li.children, (el) => el.remove());
            }

            mainBlock.innerText = "";
            categoryTitle.innerText = "";
            subMenu.innerText = "";
            showAllInCategory(_id, name);
        };

        ul.append(li);

        let span = document.createElement("span");
        span.innerText = name;
        subMenu.append(span);
        span.onclick = () => {
            li.onclick();
        };
    }
}

categories();

function showAllInCategory(_id, name) {
    let h = document.createElement("h1");
    h.append(name);
    categoryTitle.append(h);
    categoryTitle.append(`_${_id} - id категории`);
    showGoodsInCategory(mainBlock, _id);
    showAllGoodsInAllSubcategories(mainBlock, _id);
}

async function showGoodsInCategory(parentEl, _id) {
    let result = await gql(
        `query GoodsFromCatSort ($sort:String){
            GoodFind(query: $sort) {
                _id
                name
                description
                price
                images {
                _id
                createdAt
                text
                url
                originalFileName
                }
            }
        }`,
        { sort: JSON.stringify([{ "categories._id": _id }, { sort: [{ name: 1 }] }]) }
    );

    if (result.errors) return;

    for (let { name, _id, description, price, images } of result.data.GoodFind) {
        let shelfToker = document.createElement("div");
        shelfToker.classList.add("shelfToker");

        shelfToker.onclick = (e) => {
            e.stopPropagation();
            shelfToker.classList.add("shelfTokerBig");
        };

        parentEl.append(shelfToker);

        let h3 = document.createElement("h3");
        h3.append(name);
        shelfToker.append(h3);

        h3 = document.createElement("h3");
        h3.append("$ " + price);
        shelfToker.append(h3);

        let p = document.createElement("p");
        let h4 = document.createElement("h4");
        h4.append("Описание: ");
        p.append(h4);
        p.append(description);
        shelfToker.append(p);

        let divImg = document.createElement("div");
        divImg.classList.add("divImg");

        for (let img of images) {
            let divImgOne = document.createElement("div");
            divImgOne.classList.add("divImgOne");

            let imgNode = document.createElement("img");
            imgNode.src = urlConst + `/` + img.url;

            divImgOne.append(imgNode);
            divImg.append(divImgOne);

            let namberOfImg = 0;

            imgNode.onclick = (e) => {
                e.stopPropagation();
                forImage.style.display = "";
                forImgSrc.src = urlConst + `/` + images[namberOfImg].url;
                forImage.onclick = () => {
                    forImgSrc.src =
                        urlConst +
                        `/` +
                        images[namberOfImg++ % (images.lenght ? images.lenght : 1)].url;
                };

                let imgKeyEsc = (ev) => {
                    if (ev.code === "Escape") {
                        forImage.style.display = "none";
                        window.removeEventListener("keydown", imgKeyEsc);
                    }
                };

                window.addEventListener("keydown", imgKeyEsc);
            };
        }

        shelfToker.append(divImg);

        let count = document.createElement("input");
        count.setAttribute("type", "number");
        count.setAttribute("min", "1");
        count.value = "1";
        count.onclick = (e) => {
            e.stopPropagation();
        };
        shelfToker.append(count);

        let putInBasketBtn = document.createElement("button");
        putInBasketBtn.append("Добавить в корзину");
        putInBasketBtn.classList.add("putInBasketBtn");
        // if (!localStorage.authToken) putInBasketBtn.setAttribute("disabled", "disabled");

        putInBasketBtn.onclick = (e) => {
            e.stopPropagation();
            addToBasket(_id, count.value);
        };

        shelfToker.append(putInBasketBtn);
        shelfToker.insertAdjacentHTML("beforeEnd", `<div>${_id} - id товара</div>`);

        let shelfTokerExitBtn = appendActionBtn(shelfToker, { onTop: false }, "Вернуться назад");
        shelfTokerExitBtn.classList.add("shelfTokerExitBtn");
    }
}

function addToBasket(_idValue, countValue) {
    basketObj[loginId][_idValue] = +countValue;
    updateBasketObj();
    alert(`Товар добавлен в корзину.`);
}

async function showAllGoodsInAllSubcategories(parentEl, catId) {
    let result = await gql(
        `query subCategories ($subcat:String){
            CategoryFind(query: $subcat) {
                name
                _id
                
            }
        }`,
        { subcat: JSON.stringify([{ "parent._id": catId }, { sort: [{ name: 1 }] }]) }
    );

    if (result.errors) return;

    for (let { _id } of result.data.CategoryFind) {
        showGoodsInCategory(parentEl, _id);
        showAllGoodsInAllSubcategories(parentEl, _id);
    }
}

function CreateInputField(parentNode, hidden = false, isCheckNeed = false) {
    let inpEl = document.createElement("input");
    inpEl.setAttribute("type", hidden ? "password" : "text");
    inpEl.setAttribute("placeholder", hidden ? "Password" : "Login");

    inpEl.oninput = (isUser = true) => {
        if (isUser && this.onChange && typeof this.onChange === "function") {
            this.onChange(inpEl.value);
        }
    };

    parentNode.append(inpEl);

    let div = document.createElement("div");
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    div.append(checkBox);
    let seePassword = document.createElement("span");
    seePassword.append("Показать пароль");
    div.append(seePassword);

    checkBox.oninput = () => {
        if (checkBox.checked) {
            inpEl.setAttribute("type", "text");
        } else inpEl.setAttribute("type", "password");
    };

    inpEl.addEventListener("keydown", (e) => {
        if (["Enter", "NumpadEnter"].includes(e.code)) {
            this.onEnter();
        }
    });

    if (isCheckNeed) {
        parentNode.append(div);
    }

    this.getValue = function () {
        return inpEl.value;
    };

    this.getCheckStatus = function () {
        return checkBox.checked;
    };

    this.setValue = function (value = "") {
        inpEl.value = value;
    };

    this.setCheckBox = function (value = false) {
        checkBox.checked = value;
    };

    this.onChange = () => {};

    this.onEnter = () => {};
}

function CreateLoginForm(parentNode, isModeLogin = true) {
    //isModeLogin = true  - по умолчанию создается форма для логина
    // false - будет сождаваться форма для регистрации
    let loginField = new CreateInputField(parentNode);
    let passwordField = new CreateInputField(parentNode, true, true);
    // function CreateInputField(parentNode, hidden = false, isCheckNeed = false)

    let loginButton = document.createElement("button");
    loginButton.append(isModeLogin ? "Войти" : "Зарегистрироваться");
    loginButton.setAttribute("disabled", "disabled");
    parentNode.append(loginButton);

    let canselButton = document.createElement("button");
    canselButton.append("Отмена");

    parentNode.append(canselButton);

    loginField.onChange = passwordField.onChange = () => {
        if (loginField.getValue() && passwordField.getValue()) {
            loginButton.removeAttribute("disabled");
        } else loginButton.setAttribute("disabled", "disabled");
    };

    loginField.onEnter = passwordField.onEnter = () => loginButton.onclick();

    canselButton.onclick = () => {
        this.clearAndClose();
    };

    loginButton.onclick = () => {
        if (this.submit && typeof this.submit === "function") {
            let loginInfo = {
                login: loginField.getValue(),
                password: passwordField.getValue(),
            };
            this.submit(loginInfo);
        }
    };

    this.submit = () => {};

    this.clearAndClose = function () {
        loginField.setValue();
        passwordField.setValue();
        passwordField.setCheckBox();
        parentNode.style.display = "none";
    };
}

let loginFormObject = new CreateLoginForm(loginForm);
let registrationFormObject = new CreateLoginForm(registrationForm, false);

loginFormObject.submit = (loginInfo) => {
    loginToDB(loginInfo);
};

registrationFormObject.submit = (reginInfo) => {
    registrToDB(reginInfo);
};

async function loginToDB({ login, password } = {}) {
    let result = await gql(
        `query login($login: String, $password: String) {
            login(login: $login, password: $password)
        }`,
        { login, password }
    );

    if (result.errors) {
        alert("Ошибка сети");
        return;
    }

    if (result.data.login) {
        localStorage.authToken = result.data.login;
        loginFormObject.clearAndClose();
        loginForm.style.display = "none";
        registrationFormObject.clearAndClose();
        registrationForm.style.display = "none";
        checkAuthToken();
    } else alert("Ошибка!\nВведите правильные логин и пароль.");
}

async function registrToDB({ login, password } = {}) {
    let result = await gql(
        `mutation newUser($login: String, $password: String) {
            UserUpsert(user: {login: $login, password: $password}) {
                _id
                createdAt
            }
        }`,
        { login, password }
    );

    if (result.errors) {
        alert(`Ошибка регистрации:\n${result.errors[0].message}`);
        return;
    }
    alert("Вы успешно зарегистрированы.");
    loginToDB({ login, password });
}

historyDiv.onclick = () => {
    showOrderHistory(forBasket);
};

async function showOrderHistory(parentNode) {
    let result = await gql(
        `query FindOrders($lookOrders2:String){
            OrderFind(query:$lookOrders2){
                total
                orderGoods{
                    good{
                        name
                        images{
                            url
                        }
                    }
                    price
                    count
                    total
                }
            }
        }`,
        { lookOrders2: JSON.stringify([{}]) }
        // { lookOrders2: JSON.stringify([{}, { sort: [{ total: 1 }] }]) }
        // ++++++++++++++    а вот эта сортировка ну никак не работает...???   +++++++++
        // потому что total - вычисляемое поле
    );

    if (result.errors) {
        alert("Ошибка сервера...");
        console.log(result.errors);
        return;
    }

    parentNode.style.display = "";
    let masterTotal = 0;
    forBasket.innerHTML = "";

    appendActionBtn(forBasket, { onTop: true }, "Вернуться назад");
    result.data.OrderFind.forEach((order) => {
        let div1order = document.createElement("div");
        forBasket.prepend(div1order);
        showOrder(div1order, order);

        let h = document.createElement("h4");
        div1order.append(h);
        h.append(`Всего за заказ: $${order.total}`);

        masterTotal += order.total;
    });

    h = document.createElement("h2");
    forBasket.prepend(h);
    h.append(`Общая сумма всех заказов: $${masterTotal}`);

    appendActionBtn(forBasket, { onTop: true }, "Вернуться назад");

    forBasket.scrollTop = 0;
}

const appendActionBtn = function (parent, { onTop = false }, innerText = "Вернуться назад") {
    let exitBtn = document.createElement("button");
    exitBtn.append(innerText);
    if (onTop) {
        parent.prepend(exitBtn);
    } else {
        parent.append(exitBtn);
    }

    exitBtn.onclick = () => {
        parent.style.display = "none";
        parent.innerHTML = "";
    };

    return exitBtn;
};

const showOrder = function (parent, { orderGoods: orderArray, total: total1Order }) {
    for (let { good, price, count, total: total1pozition } of orderArray) {
        if (!good) {
            good = {
                images: [
                    {
                        url: "",
                    },
                ],
                name: "",
            };
        }
        // да, это костыль, но увы не смог составить запрос, чтобы вложенное поле
        // в массиве-в обекте-в массиве не равнялось null
        // И вообще! Это ли не сервер должен следить, чтобы в базу чушь не заносили?

        parent.innerHTML = "";
        let div = document.createElement("div");
        parent.append(div);

        let img = document.createElement("img");
        div.append(img);
        img.src = urlConst + `/` + good.images[0].url;

        let p = document.createElement("p");
        div.append(p);
        p.append(good.name);

        p = document.createElement("p");
        div.append(p);
        p.append(`Цена: $${price}`);

        p = document.createElement("p");
        div.append(p);
        p.append(`Кол-во: ${count}`);

        p = document.createElement("p");
        div.append(p);
        p.append(`Всего: $${total1pozition}`);
    }
};

basketLogo.onclick = () => {
    showBasket(forBasket);
};

async function showBasket(parent) {
    parent.style.display = "";
    parent.innerHTML = "";
    appendActionBtn(parent, { onTop: true }, "Вернуться назад");

    if (!Object.keys(basketObj[loginId]).length) {
        let h = document.createElement("h3");
        h.append("Ваша корзина пустая");
        parent.append(h);
    } else {
        for (let [_id, count] of Object.entries(basketObj[loginId])) {
            await show1goodFromBasket(parent, _id, +count);
        }

        let hTotal = document.createElement("h3");
        hTotal.setAttribute("id", "hTotal");
        // hTotal.innerText = `Общая сумма: ${CountTotal(parent)}`; //*********************** */
        parent.append(hTotal);
        CountTotal(parent);
    }

    appendActionBtn(parent, { onTop: false }, "Вернуться назад");

    if (loginId === "0") {
        let h = document.createElement("h3");
        h.append("Для оформления заказа необходимо авторизоваться");
        parent.append(h);
    } else {
        let btn = appendActionBtn(parent, { onTop: false }, "Оформить заказ (купить)");
        btn.setAttribute("id", "buyBtn");
        if (!Object.keys(basketObj[loginId]).length) {
            btn.setAttribute("disabled", "disabled");
        }

        btn.onclick = () => {
            parent.style.display = "none";
            parent.innerHTML = "";
            buy();
        };
    }
}

const CountTotal = function (parent) {
    let totalCost = 0;
    let costFieldsAll = parent.querySelectorAll(".costField");
    [].forEach.call(costFieldsAll, (el) => {
        totalCost += +el.innerText.slice(1);
    });
    hTotal.innerText = `Общая сумма: $${totalCost}`;
    //
    //
    //
    //
};

async function get1goodFromDB(_id) {
    let result = await gql(
        `query oneGood ($_id:String){
            GoodFind(query:$_id ) {
            _id
            name
            price
            images {
                url
                }
            }
        }`,
        { _id: JSON.stringify([{ _id: _id }]) }
    );

    if (result.errors) {
        console.log("не смог получить товар из DB для отображения в корзине:", result.errors);
        return;
    }

    return result.data.GoodFind[0];
}

async function show1goodFromBasket(parent, _id, count) {
    let item = await get1goodFromDB(_id);

    let div = document.createElement("div");
    parent.append(div);

    let img = document.createElement("img");
    div.append(img);
    img.src = urlConst + `/` + item.images[0].url;

    let p = document.createElement("p");
    div.append(p);
    p.append(item.name);

    p = document.createElement("p");
    div.append(p);
    p.append(`Цена: $${item.price}`);

    let inpCount = document.createElement("input");
    inpCount.setAttribute("type", "number");
    inpCount.setAttribute("min", "1");
    inpCount.value = count;

    div.append(inpCount);

    let cost = document.createElement("p");
    cost.setAttribute("class", "costField");
    div.append(cost);
    cost.append(`$${Math.round(count * item.price)}`);

    let btn = appendActionBtn(div, { onTop: false }, "Удалить");

    inpCount.oninput = async function () {
        basketObj[loginId][_id] = +inpCount.value;
        await updateBasketObj();
        cost.innerHTML = `$${Math.round(inpCount.value * item.price)}`;
        CountTotal(parent);
    };

    btn.onclick = async function () {
        delete basketObj[loginId][_id];
        if (!Object.keys(basketObj[loginId]).length) {
            buyBtn.setAttribute("disabled", "disabled");
        }
        await updateBasketObj();
        div.remove();
        CountTotal(parent);
    };
}

async function buy() {}

window.onload = init;

// "[{  \"_id\": \"5dc45d0b5df9d670df48cc4b\"}]"
