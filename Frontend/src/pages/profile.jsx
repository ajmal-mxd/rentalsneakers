import React, { useState,useEffect } from "react";
import axios from "axios";
import '../App.css'
import { useNavigate } from "react-router-dom";


function profile() {


  function handlelogout() {
    localStorage.removeItem("token");
    Navigate("/signup");
  }



  const [user, setUser] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {

    axios.get("http://localhost:5001/user/profile", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`, // Add token from local storage
      },
    })
      .then(response => {
        setUser(response.data);
        console.log(response.data);

      })
      .catch(error => console.error("Error:", error));


  }, [])





  return (
    <>
      <div className="userprofile-container">

        <div className="userprofile-profile-header">
          <img
            src=" https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            alt="Profile Picture"
            className="userprofile-profile-picture"
          />
          <h1 className="userprofile-profile-name">@{user.username}</h1>
          <p className="userprofile-profile-bio">{user.username} <br />{user.phone}</p>
          <button className='userprofile-button'onClick={() =>Navigate("/editprofile")} >Edit</button>
        </div>
        <div className="userprofile-profile-stats">
          <div className="userprofile-stat-card">
            <div className="userprofile-stat-value">Orders</div>
            <div className="userprofile-stat-label"></div>
          </div>
          <div className="userprofile-stat-card">
            <div className="userprofile-stat-value">Help</div>
            <div className="userprofile-stat-label"></div>
          </div>
          <div className="userprofile-stat-card">
            <div className="userprofile-stat-value" onClick={handlelogout}>Log Out</div>
            <div className="userprofile-stat-label"></div>
          </div>
        </div>
        <div className="userprofile-profile-details">
          <div className="userprofile-details-section">
            <h2 className="userprofile-details-heading">Adress</h2>
            <div className="userprofile-details-grid">
              <div className="userprofile-details-item">
                <div className="userprofile-details-label">Full name</div>
                <div className="userprofile-details-value">{user.username}</div>
              </div>
              <div className="userprofile-details-item">
                <div className="userprofile-details-label">Email</div>
                <div className="userprofile-details-value">{user.email}</div>
              </div>
              <div className="userprofile-details-item">

                <div className="userprofile-details-label">Location</div>
                <div className="userprofile-details-value">{user.location}</div>
                <div className="userprofile-details-label">pincode</div>
                <div className="userprofile-details-value">{user.pincode}</div>
              </div>
              {/* <div className="userprofile-details-item">
                        <div className="userprofile-details-label"></div>
                        <div className="userprofile-details-value"> </div>
                    </div> */}
              <div className="userprofile-details-item">
                <div className="userprofile-details-label">Phone no</div>
                <div className="userprofile-details-value">{user.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default profile