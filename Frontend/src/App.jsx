import { useState } from 'react'

import './App.css'
import LoginRegister from './pages/LoginRegister'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/profile'
import Editprofile from './pages/Editprofile'
import AdminDashboard from '../components/admin/AdminDashboard'
import ProductList from './pages/ProductList'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<LoginRegister />} />
          <Route path="/" element={<Homepage />} />
          <Route path='//admindashboard/*' element={<AdminDashboard/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editprofile" element={<Editprofile/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/resetpassword/:token" element={<ResetPassword/>} />
          <Route path="/productlist" element={<ProductList/>} />


                    
        </Routes>
      </Router>
      
       
    </>
  )
}

export default App
