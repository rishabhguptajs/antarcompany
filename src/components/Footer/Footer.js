// src/components/Footer.js

import React from "react"

const Footer = () => {
  const time = new Date().getFullYear();
  console.log(time);
  return (
    <footer>
      <p>&copy; {time} Your Company. All rights reserved.</p>
    </footer>
  )
}

export default Footer
