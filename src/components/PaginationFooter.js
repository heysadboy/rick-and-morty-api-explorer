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
                    <div class="ui basic buttons">
                        <button class="ui button" onClick={previousButton}><i class="left chevron icon"></i></button>
                        <button class="ui button" onClick={nextButton}><i class="right chevron icon"></i></button>
                    </div>
                </div>
                <div className="content">Showing <strong>{fromNumber}</strong> - <strong>{toNumber}</strong> of <strong>{data.count}</strong> {type}</div>
            </div>
        </div>
    )
};

export default PaginationFooter;