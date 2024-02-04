import React from 'react'
import "./Attributes.css"
import JsonTable from '../JsonTableHelper'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const actions = [{
    name: "Edit",
    element: <div onClick={() => handleEdit()}><MdModeEdit /></div>
}, {
    name: "Delete",
    element: <div onClick={() => handleDelete()}><MdDelete /></div>
}]

function Attributes() {
    let attributes = [{
        name: "Att1",
        type: "STRING",
        subType: null,
        actions
    }, {
        name: "Att2",
        type: "LIST",
        actions,
        subType: "INTEGER"
    }, {
        name: "Att3",
        actions,
        type: "GEOLOCATION",
        subType: null
    }, {
        name: "Att4",
        type: "STRING",
        actions,
        subType: null
    }, {
        name: "Att5",
        actions,
        type: "INTEGER",
        subType: null
    }]
    return (
        <div className='attributes-page'>
            <div className='attributes-add'>
                <h1>List Of Attributes</h1>

                <button>Add Attribute</button>
            </div>

            <div className='attributes-list'>
                <JsonTable data={attributes} />
            </div>
        </div>
    )
}

export default Attributes