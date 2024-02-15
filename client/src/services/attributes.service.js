import toast from "react-hot-toast";
import ApiService from "./api.service";


const getAllAttributes = async () => {
    try {
        ApiService.setAuthToken("Bearer " + localStorage.getItem("_t"));

        let response = await ApiService.getData('api/v1/attribute');
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response.data
        }
    } catch (ex) {
        console.log(ex);
    }
}

const getAttributeDetails = async (attributeId) => {
    try {
        ApiService.setAuthToken("Bearer " + localStorage.getItem("_t"));

        let response = await ApiService.postData('api/v1/attribute/'+ attributeId);
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response.data
        }
    } catch (ex) {
        console.log(ex);
    }
}


const updateAttribute = async (payload, attributeId) => {
    try {
        ApiService.setAuthToken("Bearer " + localStorage.getItem("_t"));

        let response = await ApiService.postData('api/v1/attribute/'+ attributeId, payload);
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response.data

        }
    } catch (ex) {
        console.log(ex);
    }
}


const deleteAttribute = async (attributeId, payload) => {
    try {
        ApiService.setAuthToken("Bearer " + localStorage.getItem("_t"));

        let response = await ApiService.postData('api/v1/attribute/' + token, payload);
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response.data

        }
    } catch (ex) {
        console.log(ex);
    }
}

export default {
   getAllAttributes, updateAttribute, getAttributeDetails, deleteAttribute
}