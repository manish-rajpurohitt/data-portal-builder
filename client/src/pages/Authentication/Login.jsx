import React, { useEffect } from 'react'
import authHelper from '../../helpers/authHelper';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import localStorageHelper from '../../helpers/localstorage.helper';
import { loginUser } from "../../services/auth.service";

export default function Login(props) {

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const loginUserr = async (e) => {
        e.preventDefault();
        try {
            if (!authHelper.isValidEmail(user.email)) {
                toast.error("Enter valid email.");
            } else if (user.password === null || user.password === "") {
                toast.error("Password field should not be empty.");
            } else {
                let respnse = await loginUser(user);
                if (respnse.isSuccess) {
                    localStorageHelper.addAuthData(respnse.data);
                    props.setIsAuthenticated(true);
                    navigate("/main");
                }
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || err);
        }

    }

    useEffect(() => {
        if (localStorageHelper.checkIfUserIsAuthenticated()) {
            navigate("/main");
        } else {
            navigate("/login");
        }
    }, [])


    return (
        <div className='login'>
            <form onSubmit={loginUserr}>
                <label>Email</label>
                <input typ="text" placeholder='Enter email..' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <label>Password</label>
                <input typ="pasword" placeholder='Enter Password..' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <Link to="/forgotPassword"> Forgot Password? </Link>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
