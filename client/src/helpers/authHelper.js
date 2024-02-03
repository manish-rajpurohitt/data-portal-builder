

let authHelper = {};

authHelper.isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

authHelper. matchPasswordCriteria = (password) => {
    if(!(/[a-z]/.test(password))){
        console.log("a")
        toast.error("Password should contain atleast one lowercase charecter.");
        return false;
    }
    if (!(/[A-Z]/.test(password))){
        console.log("a")
        toast.error("Password should contain atleast one uppercase charecter.");
        return false;
    }
    if (!(/\d/.test(password))){
        console.log("a")
        toast.error("Password should contain atleast one number.");
        return false;
    }
    if (!(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password))){
        console.log("a")
        toast.error("Password should contain atleast one special charecter.");
        return false;
    }
    else
      return true;
}

export default authHelper;
  