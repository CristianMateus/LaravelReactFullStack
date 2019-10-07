// Estilos
import "./Header.scss";

// React
import React from "react";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
    const icons = [
        { name: "Usuarios", icon: "fas fa-users", route:"/users"},
        { name: "Roles", icon: "fas fa-user-cog",  route:"/roles"},
        { name: "Compañías", icon: "fas fa-building", route:"/companies"},
        { name: "Modulos", icon: "fas fa-solar-panel", route:"/modules"}
    ];
    return (
        <div className="Header__container">
            <div className="Header__icons">
                {icons.map((icon, index) => (
                    <i
                        key={index}
                        className={[icon.icon, "Header__icon"].join(" ")}
                        onClick={() => history.push(icon.route)}
                    />
                ))}
            </div>
        </div>
    );
};

export default withRouter(Header);
