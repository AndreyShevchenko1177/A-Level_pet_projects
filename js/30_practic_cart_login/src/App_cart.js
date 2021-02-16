// cart
// npm i node-sass@4.14.1
// npm i react-redux

import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import "./App.scss";

const КОШИК = connect((s) => ({ cart: s }))(({ cart }) => <h1>{Object.values(cart).reduce((a, b) => a + b, 0)}</h1>);

const GoodCard = ({
    good: { _id, name, description, price, images: [{ url = logo }] = [{}] },
    onAdd,
    onDelete,
    cart,
}) => (
    <li className="GoodCard">
        <figure>
            <img src={`http://shop-roles.asmer.fs.a-level.com.ua/${url}`} />
            <figcaption>
                {name}
                <button onClick={() => onAdd(_id)}>+</button>
                <span>{cart[_id] || 0}</span>
                <button onClick={() => onDelete(_id)}>-</button>
            </figcaption>
        </figure>
    </li>
);

const actionCartAdd = (id, count = 1) => ({
    type: "CART_ADD",
    id,
    count,
});

const actionCartDelete = (id, count = 1) => ({
    type: "CART_ADD",
    id,
    count: -count,
});

const actionCartClear = (id) => ({
    type: "CART_DELETE",
    id,
});

const CGoodCard = connect((s) => ({ cart: s }), { onAdd: actionCartAdd, onDelete: actionCartDelete })(GoodCard);

function cartReducer(state = {}, { type, id, count }) {
    if (type === "CART_ADD") {
        return {
            ...state,
            [id]: count + (state[id] || 0),
        };
    }

    if (type === "CART_DELETE") {
        const { [id]: skip, ...newState } = state;
        return newState;
    }

    return state;
}

const store = createStore(cartReducer);

store.subscribe(() => console.log(store.getState()));

const Goods = ({
    goods = [
        {
            _id: "5dcabcf46d09c45440d14cf3",
            name: "Классический сет №6 (48 кусочков)",
            description:
                "Состав: Рис, свинина, болгарский перец, жареный лук, чесночное масло, соевый соус.\n\nВес: 300г",
            price: 110,
            images: [{ url: "images/721581d280a9c11b4e3a93006ef4996e" }],
        },
        {
            _id: "5dc8844e0e36db246e3049bd",
            name: "Пицца Party Pizza and Puzzo",
            description:
                "Состав: Бекон, Салями, Ветчина, Оливки, Свежие томаты,Сыр моцарелла, специи, соус\n\n\nВес :730г",
            price: 210,
            images: [{ url: "images/f4a43097c6e3dbd43e758d0256047620" }],
        },
        {
            _id: "5dc884c50e36db246e3049be",
            name: "Пицца Аль Капоне",
            description:
                "Состав: Бекон, пикантный говяжий карбонат, свежие томаты, огурчики корнишоны, лук салатный, сыр моцарелла, специи, соус тар-тар\n\n\nВес: 780г",
            price: 200,
            images: [{ url: "images/d0d3ddf0b962ee21aa864f18997ce6a2" }],
        },
        {
            _id: "5dc8858a0e36db246e3049bf",
            name: "Пицца Амиго",
            description:
                "Салями, ветчина, курица барбекю, свинина барбекю, бекон, свежие томаты, сыр моцарелла, специи, соус.\n\n\nВес:1350г",
            price: 175,
            images: [{ url: "images/a3d51bc7893b39f92d8fb593b15fb9a5" }],
        },
    ],
}) => (
    <div className="Goods">
        <ul>
            {goods.map((good) => (
                <CGoodCard good={good} />
            ))}
        </ul>
    </div>
);

const App = () => (
    <div>
        <Provider store={store}>
            <КОШИК />
            <Goods />
        </Provider>
    </div>
);

export default App;
