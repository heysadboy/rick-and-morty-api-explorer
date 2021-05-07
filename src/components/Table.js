import React from 'react';
import '../css/Table.css';

const Table = ({ title, headerData, rows }) => {
    const headers = headerData.map(header => <th key={header.id}>{header.name}</th>);

    return (
        <div className="table-container">
            <h1 className="ui header">{title}</h1>
            <table className="ui celled table">
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default Table;