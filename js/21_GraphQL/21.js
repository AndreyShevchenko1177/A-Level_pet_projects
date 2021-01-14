const delay = (ms) => new Promise((res) => setTimeout(() => res(ms), ms));

//localStorage.removeItem("authToken");

const urlConst = "http://shop-roles.asmer.fs.a-level.com.ua";

goLogin.onclick = () => (loginForm.style.display = "");

goLogoff.onclick = () => {
    localStorage.removeItem("authToken");
    checkAuthToken();
};

const checkAuthToken = function () {
    registrationForm.style.display = "none";
    loginForm.style.display = "none";
    forImage.style.display = "none";
    forBasket.style.display = "none";
    basketLogo.style.display = "none";

    goLogin.style.display = "";
    goRegistration.style.display = "";
    goLogoff.style.display = "none";

    if (localStorage.authToken) {
        goLogin.style.display = "none";
        goRegistration.style.display = "none";
        goLogoff.style.display = "";
        basketLogo.style.display = "";
        return true;
    }
    return false;
};

window.onload = checkAuthToken;

const getGQL = (url) => (query, variables = {}) => {
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(localStorage.authToken ? { Authorization: `Bearer ${localStorage.authToken}` } : {}),
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

            let shelfKeyEsc = (ev) => {
                if (ev.code === "Escape") {
                    shelfToker.classList.remove("shelfTokerBig");
                    window.removeEventListener("keydown", shelfKeyEsc);
                }
            };

            window.addEventListener("keydown", shelfKeyEsc);
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
                    forImgSrc.src = urlConst + `/` + images[namberOfImg++ % (images.lenght ? images.lenght : 1)].url;
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
        let buyBtn = document.createElement("button");
        buyBtn.append("Добавить в корзину");
        if (!localStorage.authToken) buyBtn.setAttribute("disabled", "disabled");
        buyBtn.addEventListener("click", (e) => e.stopPropagation());
        shelfToker.append(buyBtn);

        shelfToker.insertAdjacentHTML("beforeEnd", `<div>${_id} - id товара</div>`);
    }
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

// ----------- ----------- ----------- ----------- ----------- ----------- -----------
// ----------- Login Pasword -----------
// ----------- ----------- ----------- ----------- ----------- ----------- -----------

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

function CreateLoginForm(parentNode) {
    let loginField = new CreateInputField(parentNode);
    let passwordField = new CreateInputField(parentNode, true, true);

    let loginButton = document.createElement("button");
    loginButton.append("Войти");
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

let loginObject = new CreateLoginForm(loginForm);

loginObject.submit = (loginInfo) => {
    loginToDB(loginInfo);
};

async function loginToDB({ login, password } = {}) {
    let result = await gql(
        `query login($login: String, $password: String) {
            login(login: $login, password: $password)
        }`,
        // { sort: JSON.stringify([{ "categories._id": _id }, { sort: [{ name: 1 }] }]) }
        { login, password }
    );

    if (result.errors) {
        alert("Ошибка авторизации");
        return;
    }

    if (result.data.login) {
        localStorage.authToken = result.data.login;
        loginObject.clearAndClose();
        loginForm.style.display = "none";
        checkAuthToken();
    } else alert("Ошибка!\nВведите правильные логин и пароль.");
}

// ----------- ----------- ----------- ----------- ----------- ----------- -----------
// ----------- Корзина ----------- ----------- Корзина ----------- ----------- Корзина -----------
// ----------- ----------- ----------- ----------- ----------- ----------- -----------

basketLogo.onclick = () => {
    showBasket(forBasket);
};

leaveBasket.onclick = () => {
    forBasket.style.display = "none";
};

async function showBasket(parentNode) {
    parentNode.style.display = "";
}
