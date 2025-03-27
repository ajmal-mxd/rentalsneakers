import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminDashboard.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5001/user?search=${search}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const handleBlockUser = async (id, blocked) => {
    if (!window.confirm(`Are you sure you want to ${blocked ? "unblock" : "block"} this user?`)) return;

    try {
      await axios.put(`http://localhost:5001/user/block/${id}`, {}, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="users-details-page">
      <h2>Manage Users</h2>
      <input 
        type="text" 
        placeholder="Search users..." 
        className="users-search"
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.blocked ? "Blocked" : "Active"}</td>
                  <td>
                    <button 
                      className={user.blocked ? "unblock-btn" : "block-btn"}
                      onClick={() => handleBlockUser(user._id, user.blocked)}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
