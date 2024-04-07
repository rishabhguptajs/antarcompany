// src/components/Header/Header.js

import React from "react"
import "./Header.css"
import logo from "../../assets/images/logo.png"

const Header = () => {
  return (
    <header className="header">
      <nav>
        <span>
          <img src={logo} className="h-20 rounded-full" />
        </span>
        <ul>
          <li>Home</li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
