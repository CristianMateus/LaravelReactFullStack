// AntDesign
import { Tooltip } from "antd";

// Estilos
import "./SideDrawer.scss";

// React
import React from "react";
import { withRouter } from "react-router-dom";

const SideDrawer = ({ history }) => {
    const icons = [
        { name: "Usuarios", icon: "fas fa-users", route: "/users" },
        { name: "Roles", icon: "fas fa-user-cog", route: "/roles" },
        { name: "Compañías", icon: "fas fa-building", route: "/companies" },
        { name: "Modulos", icon: "fas fa-solar-panel", route: "/modules" }
    ];
    return (
        <div className="SideDrawer__container">
            <div className="SideDrawer__icons">
                {icons.map((icon, index) => (
                    <Tooltip title={icon.name} key={index} placement="right">
                        <i
                            className={[icon.icon, "SideDrawer__icon"].join(" ")}
                            onClick={() => history.push(icon.route)}
                        />
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default withRouter(SideDrawer);
