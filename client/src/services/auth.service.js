import toast from "react-hot-toast";
import ApiService from "./api.service";


const loginUser = async (payload) => {
    try {
        let response = await ApiService.postData('api/v1/auth/login', payload);
        console.log(response)
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response
        }
    } catch (ex) {
        console.log(ex);
    }
}

const registerUser = async (payload) => {
    try {
        let response = await ApiService.postData('api/v1/auth/signup', payload);
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response
        }
    } catch (ex) {
        console.log(ex);
    }
}


const forgotPassword = async (payload) => {
    try {
        let response = await ApiService.postData('api/v1/auth/forgot_password', payload);
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response

        }
    } catch (ex) {
        console.log(ex);
    }
}


const resetPassword = async (token, payload) => {
    try {
        let response = await ApiService.postData('api/v1/auth/reset_password?verify_token=' + token, payload);
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response

        }
    } catch (ex) {
        console.log(ex);
    }
}


const emailVerification = async (token, payload) => {
    try {
        let response = await ApiService.getData('api/v1/auth/verify_email_by_token?verify_token=' + token, payload);
        if (response.hasError) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            return response

        }
    } catch (ex) {
        console.log(ex);
    }
}

export {
    loginUser,
    registerUser, resetPassword, forgotPassword, emailVerification
}