import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider, connect} from 'react-redux';
import './App.scss';

const getGQL = url => 
    (query, variables={}) => 
        fetch(url, 
            {method: 'POST', 
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  ...(localStorage.authToken ? {Authorization: `Bearer ${localStorage.authToken}`} : {})
                },
                body: JSON.stringify({query,variables})})
        .then(res => res.json())

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
        return {login: true, token: action.jwt}
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

function promiseReducer(state={}, action){
    if (['LOGOUT', 'LOGIN'].includes(action.type)) return {}
    if (action.type === 'PROMISE'){
        const { name="default", status, payload, error} = action
        if (status){
            return {
                ...state, [name]: {status, payload: (status === 'PENDING' && state[name] && state[name].payload) || payload, error}
            }
        }
    }
    return state;
}


const actionAuthLogin = jwt => ({type: 'LOGIN', jwt})
const actionAuthLogout = () => ({type: 'LOGOUT'})

export const actionPromise = (name, promise) => {
    const actionPending = () => ({type: 'PROMISE', name, status: 'PENDING', payload: null, error: null})
    const actionResolved = payload => ({type: 'PROMISE', name, status: 'RESOLVED', payload, error: null})
    const actionRejected = error => ({type: 'PROMISE', name, status: 'REJECTED', payload:null, error})


    return async dispatch => {
        dispatch(actionPending())
        let payload
        try {
            payload = await promise
            dispatch(actionResolved(payload))
        }
        catch (e){
            dispatch(actionRejected(e))
        }
        return payload;
    }
}

const ButtonLogout = ({onLogout, isLoggedIn}) => 
    <button onClick={onLogout}
        disabled={!isLoggedIn}>Logout</button>

//const FormLogin = ({onLogin, isLoggedIn}) =>  //добавить инпут и стейт реакт с JWT
    //<button onClick={() => onLogin(jwt)} //из useState jwt
        //disabled={isLoggedIn}>Login</button>

const CButtonLogout = connect(s => ({isLoggedIn: s.login}),{onLogout: actionAuthLogout})(ButtonLogout)
//const CFormLogin = connect(s => ({isLoggedIn: s.login}),{onLogin: actionAuthLogin})(FormLogin)


const store = createStore(combineReducers({promise: promiseReducer, 
                                           auth: authReducer}), applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))

const gql = getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql')

const actionLogin = (login, password) => 
    async dispatch => {
        let loginData = await dispatch(actionPromise('login',gql(
            `query login($login:String, $password:String){
              login(login:$login,password:$password)
            }`,{login, password} )))
        if (loginData && loginData.data.login){
            dispatch(actionAuthLogin(loginData.data.login))
        }
    }


//console.log(store.getState())

store.dispatch(actionLogin('tst123', '123123'))
//actionLogin('tst123', '123123')(store.dispatch)


const App = () => 
<div>
    <Provider store={store}>
    {/*<CFormLogin />*/}
        <CButtonLogout />
    </Provider>
</div>

export default App;
