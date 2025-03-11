import { useState } from 'react'

import './App.css'
import LoginRegister from './pages/LoginRegister'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<LoginRegister />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/resetpassword" element={<ResetPassword/>} />

                    
        </Routes>
      </Router>
      
       
    </>
  )
}

export default App
