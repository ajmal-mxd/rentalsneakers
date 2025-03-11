import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../App.css";

function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      
      <div className="main">
        <div className="bkgrnd-img">
          
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
              <div className="hcp" onClick={() => navigate("/signup")}>Login/Signup</div> {/* ✅ Fixed */}
            </div>
          </div>
          

          
          <div className="text">
            <h1>Rent Your Favourite Sneakers</h1>
          </div>
          <button className="see-more" onClick={() => navigate("/sneakertable")}>
            See Our Sneakers
          </button>
        </div>

        
        <div className="icons">
          {["adidas", "nike", "puma", "nb", "lv", "vans", "converse"].map((brand) => (
            <div className="sm-icons" key={brand}>
              <img src={`/img/${brand}-icon.jpg`} alt={brand} />
            </div>
          ))}
        </div>

        
        <div className="bkgrnd-img2">
          {["b-pic1", "b-pic2", "b-pic3"].map((pic) => (
            <div className="pics" key={pic}>
              <img src={`/img/${pic}.jpg`} alt={pic} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;