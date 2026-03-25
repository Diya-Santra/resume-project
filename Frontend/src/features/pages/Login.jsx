import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate=useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
    await handleLogin({ email, password });
    setEmail("")
    setPassword("")
    navigate('/')
  };
  if(loading){
    return(<main><h1>Loading......</h1></main>)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              required
            />
          </div>
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
