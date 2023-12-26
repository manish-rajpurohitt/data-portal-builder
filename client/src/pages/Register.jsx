import React from 'react'

export default function Register() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullname: ""
    });

  const registerUser = (e) => {
    e.preventDefault();
  }
  
    return (
    <div>
        <form onSubmit={registerUser}>
            <label>Email</label>
            <input typ="text" placeholder='Enter email..' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
            <label>Full Name</label>
            <input typ="text" placeholder='Full Name..' value={user.fullname} onChange={(e)=>setUser({...user, fullname: e.target.value})}/>
            <label>Password</label>
            <input typ="pasword" placeholder='Enter Password..' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
            <label>Confirm Password</label>
            <input typ="password" placeholder='Confirm Pasword..' value={user.confirmPassword} onChange={(e)=>setUser({...user, confirmPassword: e.target.value})}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
