import React from 'react'

function Popup(props) {

    const { title, data, setPopup } = props;

    let [dataObj, setDataObj] = React.useState({

    })
    return (
        <div className='attribute-add-edit-popup'>
            <div className='popup-inner'>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '3%', padding: '1%', border: 'solid' }}>
                    <h1>{title === "EDIT" ? "EDIT ATTRIBUTE" : "ADD ATTRIBUTE"}</h1>
                    <button style={{ height: '25px', width: '25px', marginTop: '5%' }} onClick={() => setPopup(false, "EDIT")} className='close-popup'>X</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '3%', padding: '1%', border: 'solid' }}>

                </div>
            </div>
        </div>
    )
}

export default Popup