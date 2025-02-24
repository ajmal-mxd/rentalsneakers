import React from 'react'

function profile() {
  return (
    <div className="userprofile-container">
    <div className="userprofile-profile-header">
        <img
            src=""
            alt="Profile Picture"
            className="userprofile-profile-picture"
        />
        <h1 className="userprofile-profile-name">@Roshan</h1>
        <p className="userprofile-profile-bio">Muhammed Roshan <br/>7560822929 </p>
        <button className='userprofile-button'>Edit</button>
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
            <div className="userprofile-stat-value">Log Out</div>
            <div className="userprofile-stat-label"></div>
        </div>
    </div>
    <div className="userprofile-profile-details">
        <div className="userprofile-details-section">
            <h2 className="userprofile-details-heading">Adress</h2>
            <div className="userprofile-details-grid">
                <div className="userprofile-details-item">
                    <div className="userprofile-details-label">First name</div>
                    <div className="userprofile-details-value">Roshan</div>
                </div>
                <div className="userprofile-details-item">
                    <div className="userprofile-details-label">Email</div>
                    <div className="userprofile-details-value">roshan@example.com</div>
                </div>
                <div className="userprofile-details-item">
                    <div className="userprofile-details-label">Location</div>
                    <div className="userprofile-details-value">clt, qldy</div>
                </div>
                {/* <div className="userprofile-details-item">
                    <div className="userprofile-details-label"></div>
                    <div className="userprofile-details-value"> </div>
                </div> */}
                <div className="userprofile-details-item">
                    <div className="userprofile-details-label">Phone no</div>
                    <div className="userprofile-details-value">38491884098</div>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default profile