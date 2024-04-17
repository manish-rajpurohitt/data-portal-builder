

const isInvalid = (val) => {
    if(val === undefined || val === null || val === "" || val === false) return false;
    return true;
}

const isInvalidAttributesExists = (payload) => {
    for(let attr of Object.keys(payload)){
        if(isInvalid(payload[attr]))
            return false;
    }
    return true;
}

export {
    isInvalid,
    isInvalidAttributesExists
}