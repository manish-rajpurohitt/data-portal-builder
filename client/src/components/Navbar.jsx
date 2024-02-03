import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom";
import localStorageHelper from '../helpers/localstorage.helper';

export default function Navbar(props) {
  const navigate = useNavigate();

  const logoutUser = () =>{
    try{
      console.log("logout")
      console.log(navigate);
      localStorageHelper.removeAuthData();
      props.setIsAuthenticated(false);
      navigate("/")
    }
    catch(err){
      console.log(err);
    }
    
  }
  console.log(props);

  return (
    <nav>
        <Link to="/"> Home </Link>{
          props.isAuthenticated ? <Link onClick={logoutUser}>Logout</Link>:<>
          <Link to="/register"> Register </Link>
          <Link to="/login"> Login </Link></>
        }
        
    </nav>
  )
}
