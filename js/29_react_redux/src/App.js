import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function createStore(reducer){
    let state = reducer(undefined,{})
    let cbs   = []

    function dispatch(action={}){
        if (typeof action === 'function'){
            return action(dispatch)
        }
        let newState = reducer(state,action)
        if (state !== newState){
            state = newState
            for (let cb of cbs) cb()
        }
    }
    
    return {
        getState(){
            return state
        },
        dispatch,
        subscribe(cb){ 
            cbs.push(cb)
            return () => {
                cbs = cbs.filter(someElement => someElement !== cb)
            }
        }
    }
}

const actionPromise = (name, p) => { //прикрутить имя промиса строковое 

    const actionPending = () => ({type : 'PROMISE', status: 'PENDING', name}) //имя должно попадать в объект action
    const actionResolved = payload => ({type : 'PROMISE',  //поэтому имя параметр или имя name берется из замыкания
                                        status: 'RESOLVED', 
                                        payload, name})
    const actionRejected = error => ({type : 'PROMISE', 
                                      status: 'REJECTED', 
                                      error, name})
    return async dispatch => {
        try {
            dispatch(actionPending())
            let result = await p
            dispatch(actionResolved(result))
            return result;
        }
        catch(e){
            dispatch(actionRejected(e))
        }
    }
}

const store = createStore((state={}, 
                           {type, status, payload, error, name}) =>
    (type === 'PROMISE') ? {...state, [name]: {status, payload, error}} : state) //и этот name должен как-то учитываться в структуре хранилища

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

store.subscribe(() => console.log(store.getState()))
store.dispatch(actionPromise('delay1000', delay(1000)))
//store.dispatch(actionPromise('delay2000', delay(2000)))
//
const actionDelay1000  = () => actionPromise('delay1000', delay(1000))

const ReduxViewer = () => {
    const [stateRedux, setStateRedux] = useState(store.getState())
    useEffect(() => store.subscribe(() => setStateRedux(store.getState())),[])
    return (
        <pre>
            {JSON.stringify(stateRedux, null, 4)}
            <button onClick={() => store.dispatch(actionPromise('delay1000', delay(1000)))}>послать в редукс шото</button>
        </pre>
    )
}



const connect = (mapStateToProps, mapDispatchToProps={}) =>
    Component => 
        p => {
            const [props, setProps] = useState(mapStateToProps(store.getState()))
            useEffect(() => store.subscribe(() => setProps(mapStateToProps(store.getState()))),[])
            const w = {}
            for (const [propName, actionCreator] of Object.entries(mapDispatchToProps)){
                w[propName] = (...params) => store.dispatch(actionCreator(...params))
            }
            return (
                <Component {...w} {...props} {...p}/>
            )
        }


const Viewer = ({status, onClick}) =>
    <pre>
        {status}
        <button onClick={onClick}>послать в редукс шото</button>
    </pre>

const Viewer2 = ({status, onClick}) =>
    <h2>
        {status}
        <button onClick={onClick}>послать в редукс шото</button>
    </h2>


const connector = connect(reduxState => ({status: reduxState.delay1000 && reduxState.delay1000.status}), 
                                        {onClick: actionDelay1000} )

const ConnectedReduxViewer = connector(Viewer)
const ConnectedReduxViewer2 = connector(Viewer2)
const ConnectedH1 = connect(state => ({children: state.delay1000 && state.delay1000.payload}))('h1')

const App = () => 
<div>
    <ConnectedReduxViewer />
    <ConnectedReduxViewer2 />
    <ConnectedH1/>
    <ConnectedH1/>
    <ConnectedH1/>
</div>

export default App;
