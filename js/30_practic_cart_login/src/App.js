import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './App.css';


function authReducer(state, action){ //....
    if (state === undefined){
        //если в localStorage есть токен
        //добавить в action token из localStorage, и проимитировать LOGIN (action.type = 'LOGIN')
        // не делаем return {}
        //если localStorage пуст - return {}
        return {}
    }

    if (action.type === 'LOGIN'){
        console.log('ЛОГИН')
        return {login: true}
        //+localStorage
        //jwt_decode //npm i jwt-decode
        //            return {token: action.jwt, payload: jwt_decode(action.jwt)}
    }

    if (action.type === 'LOGOUT'){
        console.log('ЛОГАУТ')
        //-localStorage
        //вернуть пустой объект
        return {}
    }
    return state
}

const actionAuthLogin = jwt => ({type: 'LOGIN', jwt})
const actionAuthLogout = () => ({type: 'LOGOUT'})

const ButtonLogout = ({onLogout, isLoggedIn}) => 
    <button onClick={onLogout}
        disabled={!isLoggedIn}>Logout</button>

const FormLogin = ({onLogin, isLoggedIn}) =>  //добавить инпут и стейт реакт с JWT
    <button onClick={() => onLogin('lagin','parol')} //из useState jwt
        disabled={isLoggedIn}>Login</button>

const CButtonLogout = connect(s => ({isLoggedIn: s.login}),{onLogout: actionAuthLogout})(ButtonLogout)
const CFormLogin = connect(s => ({isLoggedIn: s.login}),{onLogin: actionAuthLogin})(FormLogin)


const store = createStore(authReducer)

store.subscribe(() => console.log(store.getState()))


const App = () => 
<div>
    <Provider store={store}>
        <CFormLogin />
        <CButtonLogout />
    </Provider>
</div>

export default App;
