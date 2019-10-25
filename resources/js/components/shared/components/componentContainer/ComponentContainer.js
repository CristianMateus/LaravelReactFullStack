// Ant Design
import { Button } from "antd";

// Estilos
import "./ComponentContainer.scss";

// React
import React from "react";

const ComponentContainer = ({
    title = "",
    showAddButon = true,
    addButtonClicked,
    children
}) => {
    return (
        <div className="ComponentContainer__container">
            <div className="ComponentContainer__title">
                <h4>{title}</h4>
                {showAddButon ? (
                    <Button
                        type="primary"
                        size="small"
                        ghost
                        shape="circle"
                        onClick={() => addButtonClicked()}
                    >
                        +
                    </Button>
                ) : null}
            </div>
            <div className="ComponentContainer__component">{children}</div>
        </div>
    );
};

export default ComponentContainer;
