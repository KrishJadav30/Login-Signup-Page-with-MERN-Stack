import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // 1. Send data to the Backend
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        // 2. Get the response from Backend
        const data = await response.json();
        console.log("Backend Replied:", data);

        if (response.ok) {
            alert("Signup Successful!");
            navigate("/login"); // Redirect to Login page
        }
    } catch (error) {
        console.error("Error connecting to server:", error);
        alert("Server is not running!");
    }
};

  return (
    // setEmail and setPassword are used to update the state variables email and password
    // onChange is an event that triggers when the value of the input field changes
    // e.target.value gives the value entered in the input field
    <div>
      <h2>SignUp Page</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Email ID' onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit'>SignUp</button>
      </form>
      <div className='PageSwitch'>
      <a href="/login">
      <p>Go to Login</p>
      </a>
      </div>
    </div>
  )
}

export default SignUp;