import React from 'react';
import '../App.css';


function Profile({ user }) {
  const handleLogout = () => {
    // Logic for logging out the user (e.g., clear session, redirect to login page)
    console.log('User logged out');
  };

  return (
    <div className="userprofile-container">
      <div className="userprofile-profile-header">
        <img
          src={user.profilePicture || 'https://i.pravatar.cc/300'}
          alt="Profile Picture"
          className="userprofile-profile-picture"
        />
        <h1 className="userprofile-profile-name">{user.username || '@Roshan'}</h1>
        <p className="userprofile-profile-bio">
          {user.name || 'Muhammed Roshan'} <br />
          {user.phoneNumber || '7560822929'}
        </p>
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
        <div className="userprofile-stat-card" onClick={handleLogout}>
          <div className="userprofile-stat-value">Log Out</div>
          <div className="userprofile-stat-label"></div>
        </div>
      </div>
      <div className="userprofile-profile-details">
        <div className="userprofile-details-section">
          <h2 className="userprofile-details-heading">Address</h2>
          <div className="userprofile-details-grid">
            <div className="userprofile-details-item">
              <div className="userprofile-details-label">First name</div>
              <div className="userprofile-details-value">{user.firstName || 'Roshan'}</div>
            </div>
            <div className="userprofile-details-item">
              <div className="userprofile-details-label">Email</div>
              <div className="userprofile-details-value">{user.email || 'roshan@example.com'}</div>
            </div>
            <div className="userprofile-details-item">
              <div className="userprofile-details-label">Location</div>
              <div className="userprofile-details-value">{user.location || 'clt, qldy'}</div>
            </div>
            <div className="userprofile-details-item">
              <div className="userprofile-details-label">Phone no</div>
              <div className="userprofile-details-value">{user.phoneNumber || '38491884098'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
