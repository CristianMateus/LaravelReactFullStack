// Estilos
import './ComponentContainer.scss'

// React
import React from "react";

const ComponentContainer = ({ title = "", children }) => {
    return (
        <div className="ComponentContainer__container">
            <div className="ComponentContainer__title">
                <h4>{title}</h4>
            </div>
            <div className="ComponentContainer__component">{children}</div>
        </div>
    );
};

export default ComponentContainer;
