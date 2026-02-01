import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav>

      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"} 
      </div>

      <div className={isOpen ? "navbar-links active" : "navbar-links"}>
      <ul>
        <a href="/"><li>Home</li></a>
        <a href="/login"><li>Login</li></a>
        <a href="/signup"><li>SignUp</li></a>
      </ul>
      </div>
    </nav>
  )

}

export default Nav