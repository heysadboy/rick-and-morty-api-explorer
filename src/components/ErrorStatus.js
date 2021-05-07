import React from 'react';
import '../css/ErrorStatus.css'

const ErrorStatus = ({ message }) => {
    console.log(message);

    return (
        <div className="ui error message">
            <div className="header">
                {message}
            </div>
        </div>
    );

}

export default ErrorStatus;