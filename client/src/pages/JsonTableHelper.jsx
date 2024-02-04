import React from 'react';

const JsonTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data available.</p>;
    }

    const columns = Object.keys(data[0]);

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr style={{ cursor: "pointer" }} key={index}>
                        {columns.map((column) => (
                            column === "actions" ?
                                <>
                                    {<td key={column}>{<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer" }}>{row[column][0].element} <span style={{ width: "20px" }}></span>{row[column][1].element}</div>}</td>}
                                </> : <td key={column}>{row[column] ? row[column] : "-"}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JsonTable;
