import React from "react";
import { FaHome, FaUser, FaShoppingBag, FaClipboardList, FaMoneyBill, FaChartBar } from "react-icons/fa";
import "../AdminDashboard.css";

const Sidebar = ({ setActiveSection }) => {
  const logout=()=>{
    localStorage.removeItem('token')
    window.location.href="/signup"
  }
  return (
    <div className="admin-container">
      <h2 className="text-xl font-bold mb-6">Sneaker Admin</h2>
      <button className="nav-link" onClick={() => setActiveSection("dashboard")}>
        <FaHome className="mr-2" /> Dashboard
      </button>
      <button className="nav-link" onClick={() => setActiveSection("users")}>
        <FaUser className="mr-2" /> Users
      </button>
      <button className="nav-link" onClick={() => setActiveSection("sneakers")}>
        <FaShoppingBag className="mr-2" /> Sneakers
      </button>
      <button className="nav-link" onClick={() => setActiveSection("rentals")}>
        <FaClipboardList className="mr-2" /> Rentals
      </button>
      <button className="nav-link" onClick={() => setActiveSection("payments")}>
        <FaMoneyBill className="mr-2" /> Payments
      </button>
      <button className="nav-link" onClick={() => setActiveSection("reports")}>
        <FaChartBar className="mr-2" /> Reports
      </button>
      <button className="sidebar-logout-btn" onClick={logout}>Logout</button>

    </div>
  );
};

export default Sidebar;
