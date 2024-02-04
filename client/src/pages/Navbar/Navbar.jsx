import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import localStorageHelper from '../../helpers/localstorage.helper';
export default function Navbar(props) {
    const navigate = useNavigate();

    const logoutUser = () => {
        try {
            console.log("logout")
            console.log(navigate);
            localStorageHelper.removeAuthData();
            props.setIsAuthenticated(false);
            navigate("/")
        }
        catch (err) {
            console.log(err);
        }

    }

    const navClick = (path) => {
        navigate(path)
    }

    return (
        <nav className='navbar'>
            <div className='nav-components'>
                <div className='logo'>
                    <h2>Data Portal Builder</h2>
                </div>
                <div className='nav-items'>
                    <button onClick={() => navClick("/")} to="/"> Home </button>
                    {props.isAuthenticated ? <button onClick={logoutUser}>Logout</button> : <>
                        <button onClick={() => navClick("/register")} to="/register"> Register </button>
                        <button onClick={() => navClick("/login")} to="/login"> Login </button></>
                    }
                </div>

            </div>
        </nav>
    )
}
