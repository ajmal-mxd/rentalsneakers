import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function LoginRegister() {
  const navigate = useNavigate();

  // Signup State
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState(null);
  const [loadingSignup, setLoadingSignup] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  /** 🔹 Signup Function */
  async function signupdata(e) {
    e.preventDefault();
    setSignupError(null);
    setLoadingSignup(true);

    if (!username || !email || !password) {
      setSignupError("Please fill all the fields.");
      setLoadingSignup(false);
      return;
    }

    if (password.length < 6) {
      setSignupError("Password must be at least 6 characters long.");
      setLoadingSignup(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/user/signup", {
        username,
        email,
        password,
      });

      alert(response.data.msg);
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response?.status === 400) {
        setSignupError(error.response.data.errors[0].msg);
      } else {
        setSignupError("An unexpected error occurred.");
      }
    } finally {
      setLoadingSignup(false);
    }
  }

  /** 🔹 Login Function */
  async function logindata(e) {
    e.preventDefault();
    setLoginError(null);
    setLoadingLogin(true);
  
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill all the fields.");
      setLoadingLogin(false);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/user/login", {
        email: loginEmail,
        password: loginPassword,
      });
  
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      alert(response.data.msg);
  
      // Redirect based on user role
      if (response.data.user?.role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/");
      }
  
      setLoginEmail("");
      setLoginPassword("");
  
    } catch (error) {
      console.error("Login error:", error.response?.data?.msg || error.message);
      setLoginError(error.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoadingLogin(false);
    }
  }

  return (
    <div className="log-main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      {/* 🔹 Signup Form */}
      <div className="signup">
        <form onSubmit={signupdata}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input type="text" placeholder="User name" value={username} onChange={(e) => setUserName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          {signupError && <p className="error-message">{signupError}</p>}
          <button type="submit" disabled={loadingSignup}>
            {loadingSignup ? "Signing Up..." : "Sign up"}
          </button>
        </form>
      </div>

      {/* 🔹 Login Form */}
      <div className="login">
        <form onSubmit={logindata}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
          
          {loginError && <p className="error-message">{loginError}</p>}
          <button type="submit" disabled={loadingLogin}>
            {loadingLogin ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* 🔹 Forgot Password Link */}
        <p onClick={() => navigate("/forgot-password")} className="forgot-password">
          Forgot Password?
        </p>
      </div>
    </div>
  );
}

export default LoginRegister;
