import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // This would be replaced with actual authentication logic
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          DPC LMS
        </Link>
        <div className="navbar-subtitle">
          Don Predrick College Learning Management System
        </div>
        <div className="navbar-powered">
          Developed by Dineth Nethsara | Powered by DPC Media Unit
        </div>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/courses" className="navbar-item">Courses</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            <button onClick={handleLogout} className="navbar-item logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item register-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
