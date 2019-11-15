import "./Card.scss";

import React from "react";

const Card = ({ title, isSelected = false, onCardCliked }) => {
    return (
        <div className="Card__contaier" onClick={() => onCardCliked(!isSelected)}>
            <div className="Card__selected">
                {isSelected ? <i className="far fa-check-circle"></i> : null}
            </div>
            <div className="Card__title">
                <p>{title}</p>
            </div>
        </div>
    );
};

export default Card;
