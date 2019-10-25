// Componentes Propios
import Avatar from "./components/avatar/Avatar";

// Estilos
import "./Header.scss";

// React
import React from "react";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
    return (
        <div className="Header__container">
            {/* Botón Casa */}
            <div className="Header__home-button">
                <i
                    className={["fas fa-home", "Header__home-button-icon"].join(
                        " "
                    )}
                    onClick={() => history.push("/")}
                />
            </div>
            {/* Sección Derecha */}
            <div className="Header__right-section">
                <Avatar/>
            </div>
        </div>
    );
};

export default withRouter(Header);
