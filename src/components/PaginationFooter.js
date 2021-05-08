import React, { useState } from 'react';
import '../css/PaginationFooter.css'

const PaginationFooter = ({ data, type, setPage, currentTotal }) => {
    const [fromNumber, setFromNumber] = useState(0);
    const [toNumber, setToNumber] = useState(1);

    const previousButton = () => {
        if (data.prev != null) {
            setPage(data.prev);
        }
    }

    const nextButton = () => {
        if (data.next != null) {
            setPage(data.next);
        }
    }

    return (
        <div className="ui middle aligned divided list">
            <div className="item">
                <div className="right floated content">
                    <div className="ui basic buttons">
                        <button className="ui button" onClick={previousButton}><i className="left chevron icon"></i></button>
                        <button className="ui button" onClick={nextButton}><i className="right chevron icon"></i></button>
                    </div>
                </div>
                <div className="content">Showing <strong>{fromNumber}</strong> - <strong>{toNumber}</strong> of <strong>{data.count}</strong> {type}</div>
            </div>
        </div>
    )
};

export default PaginationFooter;