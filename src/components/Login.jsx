import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo-375-89.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = {
      email,
      password,
    };

    fetch("https://as-task.onrender.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        // Debugging log
        if (data.authToken) {
          localStorage.setItem("token", data.authToken);
          localStorage.setItem("user", JSON.stringify({ email: data.email }));
          navigate("/dashboard");
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Login failed due to an error");
      });
  };

  return (
    <div className="container">
      <img src={logo} alt="VoizTrail Logo" className="img" />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <hr />
          <span>
            <Link to="/">Register Here</Link>

            <button type="submit">Secure Login</button>
          </span>
        </form>
        <p>Powered By KG Hawes, LLC.</p>
      </div>
    </div>
  );
};

export default Login;
