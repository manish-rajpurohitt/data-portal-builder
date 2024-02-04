import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Authentication/Register'
import Login from './pages/Authentication/Login'
import axios from 'axios'
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/Authentication/ForgotPassword'
import ResetPasswrd from './pages/Authentication/ResetPasswrd'
import EmailVerification from './pages/Authentication/EmailVerification'
import localStorageHelper from './helpers/localstorage.helper'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './pages/Navbar/Navbar'
import MainComponent from './pages/MainComponent/MainComponent'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const excludePaths = ["login", "register", "verifyEmail", "forgotPassword", "resetPassword"];
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!excludePaths.includes(location.pathname.split("/")[1]) && !localStorageHelper.checkIfUserIsAuthenticated()) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (localStorageHelper.checkIfUserIsAuthenticated()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);
  return (
    <div className='app'>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPasswrd />} />
        <Route path="/verifyEmail/:token" element={<EmailVerification />} />
        <Route path="/main" element={<MainComponent />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
