import React from 'react'

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Table } from '../Shared/Table';
import Popup from '../Shared/Popup';
import { useEffect } from 'react';
import { attributeService } from '../../services';
import AddEditAttributePopup from '../Attributes/AddEditAttributePopup';

function Models() {
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
                <h1>List Of Models</h1>

                <button onClick={setPopup}>Create Model</button>
            </div>

            <div className='items-list'>
                <Table setPopup={setPopup} data={attr} />
            </div>

            {popupData.showPopup && <AddEditAttributePopup setPopup={setPopup} title={popupData.popupType} data={attr[updateDataIndex]} />}
        </div>
    )
}

export default Models