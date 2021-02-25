import React, { useState, Component } from "react";
import { Container, FormControl, Nav, Navbar, Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logoPhoto from "../assets/photo_logo.jpg";
import { store } from "../Reduser";
import { Provider, connect } from "react-redux";
// import PageAuth from "../Companents/auth"
// import { store } from "../store";

import Home from "../Pages/Home";
// import Acc from "../Pages/Acc"
import Top from "../Pages/Top";
import New from "../Pages/New";
import Acc from "../Pages/Acc";
import { Login } from "../Pages/Login";

const Playllists = (props) => {
    return (
        <>
            <div> wertyuio</div>
            <div>{console.log(props)}</div>
        </>
    );
};
const Search = ({ history }) => {
    const onClick = () => history.push(`/search/${value}`);
    let [value, setValue] = useState("");
    return (
        <div class="form-inline my-2 my-lg-0">
            <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && onClick()}
            />
        </div>
    );
};

// console.log(PagePlaylist)
export default class Header extends Component {
    render() {
        return (
            <>
                {/*  */}
                <Navbar collapseOnSelect expand="md" bg="secondary" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logoPhoto}
                                height="45"
                                width="90"
                                className="d-inline-block alight-top"
                                // alt="Pelpe"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home </Nav.Link>
                                <Nav.Link href="/acc">Acc</Nav.Link>
                                <Nav.Link href="/top">Top</Nav.Link>
                                <Nav.Link href="/new">New</Nav.Link>
                                <Nav.Link href="/auth">Pages</Nav.Link>
                                {/* <Nav.Link href="/new">New</Nav.Link> */}
                                {/* <Nav.Link href="/playlists">Playlists</Nav.Link> */}
                                {/* <Nav.Link href="/playllists/:_id">Playllists</Nav.Link> */}
                            </Nav>

                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-1" />
                                <Button class="Search" variant="btn btn-dark">
                                    Search
                                </Button>
                            </Form>
                        </Navbar.Collapse>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                {/* <Button variant="btn btn-dark" className="ml-2">  Log in / Sign in</Button> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/acc" component={Acc} />
                            <Route exact path="/top" component={Top} />
                            <Route exact path="/new" component={New} />
                            <Route exact path="/login" component={Login} />

                            {/* <Route exact path="/playlists" component={Playllists} /> */}
                        </Switch>
                    </Router>
                </Provider>
            </>
        );
    }
}
