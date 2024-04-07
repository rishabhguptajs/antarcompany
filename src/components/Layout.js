// src/components/Layout.js

import React from 'react';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
