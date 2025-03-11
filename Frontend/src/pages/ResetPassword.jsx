import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`http://localhost:5001/user/reset-password/${token}`, { password });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
