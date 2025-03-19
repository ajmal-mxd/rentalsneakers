import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token'); // Replace 'authToken' with your token key

    if (token) {
      // Token exists, set authentication state to true
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="nav-bar">
      <input
        type="text"
        className="search-bar"
        id="search"
        placeholder="Search"
      />
      <div className="nav-links">
        <div className="hcp" onClick={() => navigate("/")}>Home</div>
        <div className="hcp" onClick={() => navigate("/cart")}>Cart</div>
        <div className="hcp" onClick={() => navigate("/profile")}>Profile</div>
        <div className="hcp" onClick={() => navigate("/signup")} style={{
          pointerEvents: isAuthenticated ? 'none' : 'auto',
          opacity: isAuthenticated ? 0 : 1,
        }}>Login/Signup</div> {/* ✅ Fixed */}
      </div>
    </div>

  )
}

export default Navbar