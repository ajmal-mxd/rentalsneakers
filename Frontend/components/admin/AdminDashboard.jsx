import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Sneakers from "./Sneakers";
import Rentals from "./Rentals";
import Payments from "./Payments";
import Reports from "./Reports";
import "../AdminDashboard.css";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

 
  

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="admin-content">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "users" && <Users />}
        {activeSection === "sneakers" && <Sneakers />}
        {activeSection === "rentals" && <Rentals />}
        {activeSection === "payments" && <Payments />}
        {activeSection === "reports" && <Reports />}

      </div>
    </div>
  );
};

export default AdminDashboard;
