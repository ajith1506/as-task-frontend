import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import logo from "../assets/logo-375-89.png";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = {
      firstname,
      email,
      password,
    };

    fetch("https://as-task.onrender.com/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming successful registration if no errors
        navigateTo("/login");
        // Handle response data here

        // If you have state or form management, include setSubmitting and resetForm here
      })
      .catch((error) => {
        console.error("Error:", error);
        // If you have state or form management, include setSubmitting here
      });
  };

  return (
    <div className="container">
      <img src={logo} alt="VoizTrail Logo" className="img" />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
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
            <Link to="/login">Already registered? Login</Link>
            <button type="submit">Register</button>
          </span>
        </form>
        <p>Powered By KG Hawes, LLC.</p>
      </div>
    </div>
  );
};

export default Register;
