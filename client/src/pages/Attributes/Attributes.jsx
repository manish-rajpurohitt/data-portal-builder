import React from 'react'
import "./Attributes.css"

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Table } from '../Shared/Table';
import Popup from '../Shared/Popup';
import { useEffect } from 'react';
import { attributeService } from '../../services';

const actions = [{
    name: "Edit",
    element: <div><MdModeEdit /></div>
}, {
    name: "Delete",
    element: <div ><MdDelete /></div>
}]

function Attributes() {
    let [attr, setAttr] = React.useState([]);

    useEffect(() => {
        let setAttributesData = async () => {
            let data = await attributeService.getAllAttributes();

            if (data?.attributes && data.attributes?.length > 0) {
                setAttr(data.attributes);
            }
        }

        setAttributesData();
    }, [])

    const [popupData, setPopupData] = React.useState({
        showPopup: false,
        popupType: ""
    });

    const setPopup = (val, type) => {
        console.log(val, type)
        setPopupData({ ...popupData, showPopup: val, popupType: type });
    };

    return (
        <div className='attributes-page'>
            <div className='attributes-add'>
                <h1>List Of Attributes</h1>

                <button>Add Attribute</button>
            </div>

            <div className='attributes-list'>
                <Table setPopup={setPopup} data={attr} />
            </div>

            {popupData.showPopup && <Popup setPopup={setPopup} title={popupData.popupType} />}
        </div>
    )
}

export default Attributes