import React from "react";

import './styles.css';

export default function Button({ title, action }) {
    return (
        <button id="default-button" onClick={action}>
            {title}
        </button>
    );
};
