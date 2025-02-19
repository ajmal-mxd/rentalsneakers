import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../App.css";

function LoginRegister() {
  const navigate = useNavigate(); // ✅ React Router navigation

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /** 🔹 Signup Function */
  async function signupdata(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });
      alert(response.data.msg);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.errors);
      }
      console.error(error);
    }
  }

  /** 🔹 Login Function */
  async function logindata(e) {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: loginEmail, // ✅ FIX: Backend expects `email`
        password: loginPassword, // ✅ FIX: Backend expects `password`
      });

      console.log("Token:", response.data.token);
      localStorage.setItem("token", response.data.token); // ✅ Store Token

      alert(response.data.msg);

      navigate("/home"); // ✅ Redirect to Profile Page after login
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || `Error ${error.response.status}`);
      } else {
        alert("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="log-main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      {/* 🔹 Signup Form */}
      <div className="signup">
        <form onSubmit={signupdata}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input type="text" placeholder="User name" onChange={(e) => setUserName(e.target.value)} required />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign up</button>
        </form>
      </div>

      {/* 🔹 Login Form */}
      <div className="login">
        <form onSubmit={logindata}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="email" placeholder="Email" onChange={(e) => setLoginEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;