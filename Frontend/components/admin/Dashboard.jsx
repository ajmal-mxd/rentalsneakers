import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminDashboard.css";

const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [sneakersCount, setSneakersCount] = useState(0);
  const [rentalsCount, setRentalsCount] = useState(0);
  const [recentRentals, setRecentRentals] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:5001/admin/users-count");
      const sneakersRes = await axios.get("http://localhost:5001/admin/sneakers-count");
      const rentalsRes = await axios.get("http://localhost:5001/admin/rentals-count");
      const recentRentalsRes = await axios.get("http://localhost:5001/admin/recent-rentals");
      const recentPaymentsRes = await axios.get("http://localhost:5001/admin/recent-payments");

      setUsersCount(usersRes.data.count);
      setSneakersCount(sneakersRes.data.count);
      setRentalsCount(rentalsRes.data.count);
      setRecentRentals(recentRentalsRes.data);
      setRecentPayments(recentPaymentsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Summary Boxes */}
      <div className="summary">
        <div className="card">
          <h3>Total Users</h3>
          <p>{usersCount}</p>
        </div>
        <div className="card">
          <h3>Total Sneakers</h3>
          <p>{sneakersCount}</p>
        </div>
        <div className="card">
          <h3>Total Rentals</h3>
          <p>{rentalsCount}</p>
        </div>
      </div>

      {/* Recent Rentals */}
      <div className="table-section">
        <h3>Recent Rentals</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Sneaker</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentRentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.user}</td>
                <td>{rental.sneaker}</td>
                <td>{new Date(rental.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Payments */}
      <div className="table-section">
        <h3>Recent Payments</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.user}</td>
                <td>${payment.amount}</td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
