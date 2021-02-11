import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

const Logo  = () => <img style={{maxWidth: '100px'}} src={logo} />
const menuItems = {
    '/' : 'Main',
    '/about' : 'About',
    '/add/2/2' : '2 + 2',
    '/add/3/10' : '3 + 10',
    '/category/5': 'категория-5'
}

const MenuItem = ({url, text}) => 
<li>
    <Link to={url}>{text}</Link>
</li>

const Header = () =>
<nav>
    <Logo />
    <ul>
        {Object.entries(menuItems).map(([url, text]) => <MenuItem url={url} text={text} />)
        }
    </ul>
</nav>



const PageAbout = () => <div>About</div>
const PageMain = () => <div>Main</div>
const NotFound = () => <div>404</div>
const PageAdd = ({match:{params: {a,b}}}) => <pre>{+a + +b}</pre>
const PageCategory = ({history, match:{params: {_id}}}) => {
    setTimeout(() => history.push('/'), 2000)
    return <div>cat{_id}</div>
    //useEffect(() => запрос, [_id]) //запрос осуществляется actionCreator
    //return {
        //WORSTKA
    //}
}

const App = () => 
<Router history = {createHistory()}>
    <Header />
    <div>
        <Switch>
            <Route path="/about" component = {PageAbout} />
            <Redirect from="/aboutus" to='/about' />
            <Route path="/add/:a/:b" component = { PageAdd } />
            <Route path="/category/:_id" component = { PageCategory  } />
            <Route path="/" component = { PageMain } exact/>
            <Route component = { NotFound } exact/>
        </Switch>
    </div>
</Router>



export default App;
