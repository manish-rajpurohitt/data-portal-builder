import React from 'react'

export default function Login() {

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const loginUser = (e) => {
        e.preventDefault();
    }

  return (
    <div>
        <form onSubmit={loginUser}>
            <label>Email</label>
            <input typ="text" placeholder='Enter email..' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})} />
            <label>Password</label>
            <input typ="pasword" placeholder='Enter Password..' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}
