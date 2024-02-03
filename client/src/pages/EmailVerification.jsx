import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'

function EmailVerification() {

    const {token} = useParams();
    const [msg, setMsg] = React.useState("Verifying your email....");
    const verifyToken = async () => {
        try{
            let res = await axios.get("api/v1/auth/verify_email_by_token?verify_token=" + token);

            if(res.data.isSuccess){
                setMsg(res.data.message);
            }
        }
        catch(err){
            setMsg(err?.response?.data?.message || err);
        }
    }
    

    useEffect(()=>{

        async function temp() {
            await verifyToken();
        }
        temp();
    }, []);


  return (
    <div>
        <h1> Email Verification Page</h1>
        <p>{msg}</p>
    </div>
  )
}

export default EmailVerification