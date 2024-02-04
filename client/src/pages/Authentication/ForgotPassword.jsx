import React from 'react'
import toast from 'react-hot-toast';
import authHelper from '../../helpers/authHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/auth.service';


function ForgotPassword() {
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();

    const submitForgotPassword = async () => {
        try {
            if (!authHelper.isValidEmail(email)) {
                toast.error("Enter valid email id.");
            } else {
                let res = await forgotPassword({ email });

                if (res.data.isSuccess) {
                    navigate("/login");
                }
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || err);
        }
    }
    return (
        <div>
            <label>Enter your email to send password reset link.</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="button" onClick={submitForgotPassword}> Send Email </button>
        </div>
    )
}

export default ForgotPassword