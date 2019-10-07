// Componentes Propios
import Header from "../header/Header";
import Home from "../../modules/home/Home";
import Companies from "../../modules/companies/Companies";
import Users from "../../modules/users/Users";
import Roles from "../../modules/roles/Roles";
import Modules from "../../modules/modules/Modules";

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
                    <Route path="/companies" component={Companies} />
                    <Route path="/users" component={Users} />
                    <Route path="/roles" component={Roles} />
                    <Route path="/modules" component={Modules} />
                    <Route render={() => <h1>No Encontrado</h1>} />
                </Switch>
            </div>
        </div>
    );
};

export default MainContainer;
