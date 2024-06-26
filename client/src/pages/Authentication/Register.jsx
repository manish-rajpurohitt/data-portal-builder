import axios from 'axios';
import React from 'react'
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import localStorageHelper from '../../helpers/localstorage.helper';
import { authService } from '../../services';

export default function Register() {

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: ""
  });

  const navigate = useNavigate();

  const registerUserr = async (e) => {
    e.preventDefault();
    try {
      if (user.password !== user.confirmPassword) {
        toast.error("Passwords should match!");
      } else if (!isValidEmail(user.email)) {
        toast.error("Enter valid email!");
      } else if (!matchPasswordCriteria(user.password)) {
        return;
      } else {
        let response = await authService.registerUser({ fullname: user.fullname, password: user.password, email: user.email });
        if (response.isSuccess) {
          navigate("/login");
        } else {
          console.log(response);
        }
      }
    }
    catch (err) {
      toast.error(err.response.data.message)
    }



  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const matchPasswordCriteria = (password) => {
    console.log(/[a-z]/.test(password));
    if (!/[a-z]/.test(password))
      toast.error("Password should contain atleast one lowercase charecter.");
    else if (!/[A-Z]/.test(password))
      toast.error("Password should contain atleast one uppercase charecter.");
    else if (!/\d/.test(password))
      toast.error("Password should contain atleast one number.");
    else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password))
      toast.error("Password should contain atleast one special charecter.");
    else
      return true;

    return false;
  }

  React.useEffect(() => {
    if (localStorageHelper.checkIfUserIsAuthenticated()) {
      navigate("/main");
    }
  }, [])

  return (
    <div className='register'>
      <form onSubmit={registerUserr}>
        <div className='inp-comp'>
          <label>Email:</label>
          <input typ="text" placeholder='Enter email..' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </div>
        
        <div className='inp-comp'>
        <label>Full Name:</label>
        <input typ="text" placeholder='Full Name..' value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
        </div>
        
        <div className='inp-comp'>
        <label>Password:</label>
        <input typ="pasword" placeholder='Enter Password..' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </div>
        
        <div className='inp-comp'>
        <label>Confirm Password:</label>
        <input typ="password" placeholder='Confirm Pasword..' value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
        </div>
        
        <div className='inp-comp'>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
