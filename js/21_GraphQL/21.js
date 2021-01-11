const delay = (ms) => new Promise((res) => setTimeout(() => res(ms), ms));

//localStorage.removeItem("authToken");

const urlConst = "http://shop-roles.asmer.fs.a-level.com.ua";

window.onload = start;

async function start() {
    await delay(1000);
    registrationForm.style.display = "none";
    await delay(1000);
    loginForm.style.display = "none";
    forImage.style.display = "none";
    if (localStorage.authToken) {
        login.style.display = "none";
        registration.style.display = "none";
    } else logoff.style.display = "none";
}

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
        { query: JSON.stringify([{ "parent._id": parentID }]) }
    );
    console.log(result);
    if (result.errors) return;

    let newElLevel1 = "ul";
    let newElLevel2 = "li";
    if (parentEl === subMenu) {
        newElLevel1 = newElLevel2 = "span";
    }

    let ul = document.createElement(newElLevel1);
    parentEl.append(ul);

    for (let { name, _id } of result.data.CategoryFind) {
        let li = document.createElement(newElLevel2);
        li.innerText = name;
        li.style.fontWeight = "";

        let loaded;
        li.onclick = (event) => {
            event.stopPropagation();
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
            subMenu.innerText = "";
            showAllInCategory(subMenu, _id, name);
        };

        ul.append(li);
    }
}

categories();

function showAllInCategory(parentBlock, _id, name) {
    //

    categories(parentBlock, _id);
    showGoodsInCategory(mainBlock, _id, name);
}

async function showGoodsInCategory(parentEl, _id, name) {
    //
    let h = document.createElement("h1");
    h.append(name);
    parentEl.append(h);
    parentEl.append(`  ${_id} - id категории`);

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
    console.log(2, result);
    if (result.errors) return;

    for (let { name, _id, description, price, images } of result.data.GoodFind) {
        let divMaster = document.createElement("div");
        parentEl.append(divMaster);

        divMaster.append(_id + " - id товара");

        let h3 = document.createElement("h3");
        h3.append(name);
        divMaster.append(h3);

        h3 = document.createElement("h3");
        h3.append("$ " + price);
        divMaster.append(h3);

        let p = document.createElement("p");
        let h4 = document.createElement("h4");
        h4.append("Описание:");
        p.append(h4);
        p.append(description);
        divMaster.append(p);

        let divImg = document.createElement("div");
        for (let img of images) {
            let divImgOne = document.createElement("div");
            divImgOne.classList.add("divImg");

            let imgNode = document.createElement("img");
            imgNode.src = urlConst + `/` + img.url;

            divImgOne.append(imgNode);
            divImg.append(divImgOne);

            imgNode.onclick = () => {
                forImage.style.display = "";
                forImgSrc.src = urlConst + `/` + img.url;
                forImage.onclick = () => (forImage.style.display = "none");
            };
        }
        divMaster.append(divImg);
    }
}
