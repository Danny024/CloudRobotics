import React, { Component } from 'react';
import {Container} from "react-bootstrap";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Home from "./Home";
import About from "./About";

class Body extends Component {
    render(){  
        return (
        <Container>
          <Router>
            <Routes>
                <Route path="/" exact component={Home}></Route>
                <Route path="/about" exact component={About}></Route>
            </Routes>
          </Router>
        </Container>
        );    
    }
}

export default Body;