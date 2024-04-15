// src/components/Header/Header.js

import React from "react"
import "./Header.css"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="header flex bg-slate-400 align-middle justify-center h-full p-5">
      <span>
        <img src={logo} className="h-20 rounded-full" alt="LOGO_ANTAR" />
      </span>
      <nav className="flex flex-row w-[80vw] justify-around">
        <ul className="flex flex-row w-[70%] justify-around text-black align-middle">
          <li>Home</li>
          <li>
            <Link>Discover</Link>
          </li>
          <li>
            <Link>Categories</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link>
              Become a{" "}
              <span className=" font-semibold text-[#06061a] shadow-md">
                Seller
              </span>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-row w-[30%] justify-around">
          <li>
            <Link>Sign In</Link>
          </li>
          <li>
            <Link>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
