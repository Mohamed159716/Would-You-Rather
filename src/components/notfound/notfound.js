import React from "react";
import notfound from "../../notfound.svg";

import "./notfound.styles.scss";

const NotFound = ({ history }) => {
    return (
        <div className="not-found">
            <img src={notfound} alt="Not Found" />
            <button onClick={() => history.push("/")} className="back">
                Go Back
            </button>
        </div>
    );
};

export default NotFound;
