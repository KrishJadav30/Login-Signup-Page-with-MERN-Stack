import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      //preventdefault stops the page from refreshing
      try {
        // 1. Send data to the Backend
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // 2. Get the response from Backend
        const data = await response.json();
        console.log("Backend Replied:", data); // Check browser console

        if (response.ok) {
            alert("Login Successful!");
            navigate("/"); // Redirect to Home
        } else {
            alert("Login Failed");
        }
    } catch (error) {
        console.error("Error connecting to server:", error);
        alert("Server is not running!");
    }
    }

  return (
    // setEmail and setPassword are used to update the state variables email and password
    // onChange is an event that triggers when the value of the input field changes
    // e.target.value gives the value entered in the input field
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email ID' onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit'>Login</button>
      </form>
      <div className='PageSwitch'>
      <a href="/signup">
      <p>Don't have an account go to Signup</p>
      </a>
      </div>
    </div>
    
  )
}

export default Login;