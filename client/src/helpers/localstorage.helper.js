let localStorageHelper = {};

localStorageHelper.removeAuthData = () => {
    localStorage.removeItem("_t");
    localStorage.removeItem("_t_exp");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    return;
}

localStorageHelper.addAuthData = (payload) => {
    localStorage.setItem("_t", payload.token);
    localStorage.setItem("_t_exp", payload.tokenExpiryDate);
    localStorage.setItem("fullname", payload.fullname);
    localStorage.setItem("email", payload.email);
}

localStorageHelper.checkIfUserIsAuthenticated = () => {
    let tokenExpiry = localStorage.getItem("_t_exp");
    if(tokenExpiry && Date.now() < new Date(tokenExpiry)){
        let token = localStorage.getItem("_t");
        if(token) return true;
        else return false;
    }else return false;
}

export default localStorageHelper;