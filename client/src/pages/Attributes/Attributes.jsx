import React from 'react'
import "./Attributes.css"

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Table } from '../Shared/Table';
import Popup from '../Shared/Popup';
import { useEffect } from 'react';
import { attributeService } from '../../services';
import AddEditAttributePopup from './AddEditAttributePopup';

const actions = [{
    name: "Edit",
    element: <div><MdModeEdit /></div>
}, {
    name: "Delete",
    element: <div ><MdDelete /></div>
}]

function Attributes() {
    let [attr, setAttr] = React.useState([]);
    let [updateDataIndex, setUpdateDataIndex] = React.useState(0);

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

    const setPopup = async (val, type, index) => {
        if(type === "EDIT" && val){
            setUpdateDataIndex(index);
        }

        setPopupData({ ...popupData, showPopup: val, popupType: type });
        if(val === false){
            let data = await attributeService.getAllAttributes();

            if (data?.attributes && data.attributes?.length >= 0) {
                setAttr(data.attributes);
            }
        }
    };

    return (
        <div className='items-page'>
            <div className='item-add'>
                <h1>List Of Attributes</h1>

                <button onClick={setPopup}>Add Attribute</button>
            </div>

            <div className='items-list'>
                <Table setPopup={setPopup} data={attr} />
            </div>

            {popupData.showPopup && <AddEditAttributePopup setPopup={setPopup} title={popupData.popupType} data={attr[updateDataIndex]} />}
        </div>
    )
}

export default Attributes