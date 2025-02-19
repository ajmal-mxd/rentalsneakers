import { useState } from 'react'

import './App.css'
import LoginRegister from './pages/LoginRegister'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<LoginRegister />} />
          <Route path="/Home" element={<Homepage />} />
          
        </Routes>
      </Router>
      
       
    </>
  )
}

export default App
