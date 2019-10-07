// Componentes Propios
import MainContainer from "./layout/mainContainer/MainContainer";

// Estilos
import './App.scss'

// React
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route } from "react-router-dom";


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MainContainer />
            </BrowserRouter> 
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
