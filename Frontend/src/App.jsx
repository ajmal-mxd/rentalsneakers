import { useState } from 'react'

import './App.css'
import LoginRegister from './pages/LoginRegister'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import Editprofile from './pages/Editprofile'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<LoginRegister />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/editprofile" element={<Editprofile/>} />

                    
        </Routes>
      </Router>
      
       
    </>
  )
}

export default App
