import React, { useEffect } from 'react'
import { attributeService } from '../../services';
import toast from 'react-hot-toast';
import { isInvalidAttributesExists } from '../../helpers/validation.helper';

function AddEditAttributePopup(props) {

    const { title, data, setPopup } = props; 

    const DATA_TYPES_OPTIONS = ['STRING', 'INTEGER', 'URL', 'BOOLEAN', 'ENUM', 'LIST', 'MAP', 'FLOAT', 'DATETIME', 'GEOLOCATION'];

    let [dataObj, setDataObj] = React.useState({
        name: "",
        type: "STRING",
        subType: "",
        subValue: ""
    });

    let changeTypeOption = (e, type) => {
        if(type === "MAIN"){
            if(e.target.value === "LIST")
                setDataObj({...dataObj, type: e.target.value, subType: "STRING", subValue: null});
            else if(e.target.value === "MAP")
                setDataObj({...dataObj, type: e.target.value, subType: "STRING", subValue: "STRING"});
            else
                setDataObj({...dataObj, type: e.target.value});
        }else{
            if(dataObj.type === "LIST"){
                setDataObj({...dataObj, subType: e.target.value});
            }else if (type === "SUBKEY"){
                setDataObj({...dataObj, subType: e.target.value});
            }else if (type === "SUBVALUE"){
                setDataObj({...dataObj, subValue: e.target.value});
            }
        }
        return;
    }

    useEffect(()=>{
        if(title === "EDIT"){
            if(data){
                setDataObj({...data});
            }
        }else{
            setDataObj({
                name: "",
                type: "STRING",
                subType: "",
                subValue: ""
            });
        }
        
    }, [])
    
    const addOrEditAttribute = async () => {
        console.log(dataObj)

        if(isInvalidAttributesExists(dataObj)){
            toast.error("Please fill all details.");
            return;
        }

        if(title === "EDIT"){
            let res = await attributeService.updateAttribute(dataObj, data._id);
        }else{
            let res = await attributeService.addAttribute(dataObj);
        }

        setDataObj({
            name: "",
            type: "STRING",
            subType: "",
            subValue: ""
        });

        setPopup(false, title);
    }

    const handleChange = (event) => {
        const newText = event.target.value;
        // Check if the newText is in camelCase
        console.log(event.target.value)
        const isCamelCase = /^[a-z][A-Za-z]*$/.test(newText) || newText === "";
    
        if (isCamelCase) {
            setDataObj({...dataObj, name: event.target.value})
        } else {
          // Prevent the user from entering non-camelCase characters
          event.preventDefault();
        }
      };

    return (
        <div className='attribute-add-edit-popup'>
            <div className='popup-inner'>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '3%', padding: '1%', border: 'solid' }}>
                    <p>{title === "EDIT" ? "EDIT ATTRIBUTE" : "ADD ATTRIBUTE"}</p>
                    <button style={{ height: '25px', width: '25px', marginTop: '5%' }} onClick={() => setPopup(false, "EDIT")} className='close-popup'>X</button>
                </div>

                <div style={{ margin: '3%', padding: '2%', border: 'solid', display: 'flex', flexDirection: 'column', alignItems: 'baseline'}}>
                    <div className='inp-comp-popup'>
                        <label>Name: </label>
                        <input onChange={handleChange} required value={dataObj.name} type='text'/>
                    </div>
                    <div className='inp-comp-popup'>
                        <label>Type of the Attribute: </label>
                        <select onChange={(e) => changeTypeOption(e, "MAIN")} value={dataObj.type}>
                            {DATA_TYPES_OPTIONS.map(option => <option key={option} >{option}</option>)}
                        </select>
                    </div>

                    {dataObj.type === "LIST" ? 
                        <>
                            <div className='inp-comp-popup'>
                                <label>Sub Type : </label>
                                <select onChange={(e) => changeTypeOption(e, "LIST")} value={dataObj.subType}>
                                    {DATA_TYPES_OPTIONS.map(option =>{ if(option !== "LIST" && option !== "MAP" && option !== "ENUM") return <option key={option}>{option}</option>})}
                                </select>
                            </div>
                        </> : (dataObj.type === "MAP" ? 
                        <>
                            <div className='inp-comp-popup'>
                                <label>Select Key: </label>
                                <select onChange={(e) => changeTypeOption(e, "SUBKEY")} value={dataObj.subType}>
                                    {DATA_TYPES_OPTIONS.map(option => {if(option !== "LIST" && option !== "MAP" && option !== "ENUM") return <option key={option} value={option} onChange={(e) => changeTypeOption(e)}>{option}</option>})}
                                </select>
                            </div>
                            <div className='inp-comp-popup'>
                                <label>Select Value: </label>
                                <select onChange={(e) => changeTypeOption(e, "SUBVALUE")} value={dataObj.subValue}>
                                    {DATA_TYPES_OPTIONS.map(option => {if(option !== "LIST" && option !== "MAP" && option !== "ENUM") return <option key={option} value={option} onChange={(e) => changeTypeOption(e)}>{option}</option>})}
                                </select>
                            </div>
                        </> : <></>)}
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                            <button style={{width:'40%'}} onClick={()=>addOrEditAttribute()}>{title === "EDIT" ? "UPDATE" : "ADD"}</button>
                            <button style={{width:'40%'}} onClick={() => setPopup(false, "EDIT", 0)}>CANCEL</button>
                        </div>             
                </div>
            </div>
        </div>
    )
}

export default AddEditAttributePopup