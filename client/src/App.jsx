import { useEffect, useState } from 'react'
import './App.css'
import {Routes, Route, useNavigate, useLocation} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import axios from 'axios'
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/ForgotPassword'
import ResetPasswrd from './pages/ResetPasswrd'
import EmailVerification from './pages/EmailVerification'
import localStorageHelper from './helpers/localstorage.helper'
import Dashboard from './pages/Dashboard'

axios.defaults.baseURL = "http://localhost:3000";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const excludePaths = ["login", "register", "verifyEmail", "forgotPassword", "resetPassword"];
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    if(!excludePaths.includes(location.pathname.split("/")[1]) && !localStorageHelper.checkIfUserIsAuthenticated()){
      navigate("/login");
    }
  }, []);

  useEffect(()=>{
    if(localStorageHelper.checkIfUserIsAuthenticated()){
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <Toaster position='bottom-center' toastOptions={{duration: 1500}} />
      <Routes>
        <Route path = "/register" element={<Register />} />
        <Route path = "/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path = "/forgotPassword" element={<ForgotPassword />} />
        <Route path = "/resetPassword/:token" element={<ResetPasswrd />} />
        <Route path = "/verifyEmail/:token" element={<EmailVerification />} />
        <Route path = "/dashboard" element={<Dashboard />} />
        <Route path = "/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
