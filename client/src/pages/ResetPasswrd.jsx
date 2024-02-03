import React from 'react'
import toast from 'react-hot-toast';
import authHelper from '../helpers/authHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function ResetPasswrd() {

    const navigate = useNavigate();
    const {token} = useParams();
    const [data, setData] = React.useState({
        password: "",
        confirmPassword: ""
    });

    const handleResetPassword = async () => {
        try{
            if(!authHelper.matchPasswordCriteria(data.password)){
                return;
            }else if(data.password !== data.confirmPassword){
                toast.error("Passwords should match.");
            }else{
                let res = await axios.post("api/v1/auth/reset_password?verify_token=" + token, {password: data.password});
                if(res.data.isSuccess){
                    toast.success(res.data.message);
                    navigate("/login");
                }
            }
        }catch(err){
            toast.error(err?.response?.data?.message || err);
        }
    }

  return (
    <div>
        <h1>Reset your password</h1>
        <label>New Password</label>
        <input type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />

        <label>Confirm Password</label>
        <input type="password" value={data.confirmPassword} onChange={(e) => setData({...data, confirmPassword: e.target.value})} />

        <button type="button" onClick={handleResetPassword}>Submit</button>
    </div>
  )
}

export default ResetPasswrd