// Componentes Propios
import Header from "../header/Header";
import Company from "../../modules/company/Company";
import Home from "../../modules/home/Home";

// Estilos
import "./MainContainer.scss";

// React
import React from "react";
import { Switch, Route } from "react-router-dom";

const MainContainer = () => {
    return (
        <div className="MainContainer__container">
            <Header />
            <div className="MainContainer__componentToShow">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/companies" component={Company} />
                    <Route render={() => <h1>No Encontrado</h1>} />
                </Switch>
            </div>
        </div>
    );
};

export default MainContainer;
