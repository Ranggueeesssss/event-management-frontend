import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Search, LogOut, Menu, X, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "success");
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/?search=${encodeURIComponent(searchVal)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <Calendar className="brand-icon" size={22} />
          <span>EventVibe</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="nav-search">
          <Search size={16} className="search-icon" />
          <input
            type="search"
            placeholder="Search events by title..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="search-input"
          />
        </form>

        {/* Desktop Links */}
        <div className="nav-actions">
          <Link to="/" className="nav-link">Explore</Link>
          
          {isAuthenticated && user?.role === 'organizer' && (
            <>
              <Link to="/organizer/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/organizer/events" className="nav-link">Manage Events</Link>
            </>
          )}

          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin/events" className="nav-link">All Events (Admin)</Link>
          )}

          <ThemeToggle />

          {isAuthenticated ? (
            <div className="nav-profile">
              <span className={`badge badge-${user.role === 'admin' ? 'danger' : 'published'}`}>
                {user.role}
              </span>
              <button 
                type="button"
                onClick={handleLogout} 
                className="btn btn-secondary btn-icon" 
                title="Logout" 
                aria-label="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="nav-mobile-controls">
          <ThemeToggle />
          <button 
            type="button" 
            className="btn btn-secondary btn-icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="nav-mobile-menu">
          <form onSubmit={handleSearchSubmit} className="nav-mobile-search">
            <Search size={16} className="search-icon" />
            <input
              type="search"
              placeholder="Search events..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="search-input"
            />
          </form>
          
          <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
          
          {isAuthenticated && user?.role === 'organizer' && (
            <>
              <Link to="/organizer/dashboard" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/organizer/events" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Manage Events</Link>
            </>
          )}

          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin/events" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>All Events</Link>
          )}

          <div className="mobile-profile-section">
            {isAuthenticated ? (
              <div className="mobile-profile-info">
                <div className="profile-details">
                  <User size={14} />
                  <span className="profile-email">{user.email}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                  className="btn btn-danger btn-block"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-block" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
