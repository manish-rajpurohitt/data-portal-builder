import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { emailVerification } from '../../services/auth.service';

function EmailVerification() {

    const { token } = useParams();
    const [msg, setMsg] = React.useState("Verifying your email....");
    const verifyToken = async () => {
        try {
            let res = await emailVerification(token);

            if (res.isSuccess) {
                setMsg(res.message);
            }
        }
        catch (err) {
            setMsg(res?.message || err);
        }
    }


    useEffect(() => {

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