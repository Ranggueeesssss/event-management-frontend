import React from 'react';
import Navbar from './Navbar';
import { ToastContainer } from './Toast';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="layout-main container">
        {children}
      </main>
      <footer className="footer">
        <div className="container footer-container">
          <p>&copy; {new Date().getFullYear()} EventVibe. Built for premium event experiences.</p>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
}
