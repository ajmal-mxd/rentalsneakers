import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminDashboard.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/user?page=${page}&search=${search}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5001/user/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-details-page">
      <h2>Manage Users</h2>
      <input 
        type="text" 
        placeholder="Search users..." className="users-search"
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
    </div>
  );
};

export default Users;
