import "./CardLayout.scss";

import React from "react";

const CardLayout = ({ children }) => {
    return <div className="CardLayout__container">{children}</div>;
};

export default CardLayout